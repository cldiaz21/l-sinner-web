const Busboy = require('busboy');
const { createClient } = require('@supabase/supabase-js');

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function getServiceSupabase() {
  const url = requireEnv('SUPABASE_URL');
  const serviceKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function getBearerToken(req) {
  const h = req.headers.authorization || req.headers.Authorization;
  if (!h) return null;
  const m = String(h).match(/^Bearer\s+(.+)$/i);
  return m ? m[1] : null;
}

async function requireAdmin(req, supabase) {
  const token = getBearerToken(req);
  if (!token) {
    const err = new Error('Unauthorized: missing Bearer token');
    err.statusCode = 401;
    throw err;
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    const err = new Error(error?.message || 'Unauthorized');
    err.statusCode = 401;
    throw err;
  }

  const user = data.user;
  const role = user.app_metadata && user.app_metadata.role;
  if (role === 'admin') return user;

  // Fallback: profiles.is_admin
  const { data: profile, error: profileErr } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .maybeSingle();

  if (profileErr) {
    const err = new Error(`No se pudo verificar rol admin: ${profileErr.message}`);
    err.statusCode = 403;
    throw err;
  }

  if (!profile?.is_admin) {
    const err = new Error('Forbidden: se requiere rol admin');
    err.statusCode = 403;
    throw err;
  }

  return user;
}

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    try {
      const bb = Busboy({ headers: req.headers, limits: { files: 1 } });
      const fields = {};
      let file = null;

      bb.on('field', (name, val) => {
        fields[name] = val;
      });

      bb.on('file', (name, stream, info) => {
        const chunks = [];
        stream.on('data', (d) => chunks.push(d));
        stream.on('limit', () => {
          const err = new Error('Archivo demasiado grande');
          err.statusCode = 413;
          reject(err);
        });
        stream.on('end', () => {
          file = {
            fieldname: name,
            filename: info.filename,
            encoding: info.encoding,
            mimetype: info.mimeType,
            buffer: Buffer.concat(chunks),
          };
        });
      });

      bb.on('error', (e) => reject(e));
      bb.on('finish', () => resolve({ fields, file }));

      req.pipe(bb);
    } catch (e) {
      reject(e);
    }
  });
}

function json(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function readJsonBody(req) {
  // Vercel/Node serverless no siempre popula req.body de forma consistente.
  const ct = String(req.headers['content-type'] || '');
  if (ct.includes('application/json')) {
    const raw = await readRawBody(req);
    const text = raw.toString('utf8') || '{}';
    try {
      return JSON.parse(text);
    } catch {
      const err = new Error('JSON inválido');
      err.statusCode = 400;
      throw err;
    }
  }

  // Fallback: si runtime ya lo parseó
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  return {};
}

async function uploadAndGetPublicUrl(supabase, bucket, path, buffer, contentType) {
  const { error: uploadErr } = await supabase.storage.from(bucket).upload(path, buffer, {
    contentType,
    upsert: false,
  });
  if (uploadErr) throw new Error(uploadErr.message);

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  if (!data?.publicUrl) throw new Error('No se pudo obtener publicUrl');
  return data.publicUrl;
}

module.exports = {
  getServiceSupabase,
  requireAdmin,
  parseMultipart,
  readJsonBody,
  uploadAndGetPublicUrl,
  json,
};

