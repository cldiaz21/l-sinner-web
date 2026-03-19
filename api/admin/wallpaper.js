/**
 * DEPRECADO para archivos grandes: Vercel devuelve 413 (FUNCTION_PAYLOAD_TOO_LARGE).
 * El Admin debe usar el flujo: POST /api/admin/upload-prepare → upload directo a Supabase → POST /api/admin/upload-commit.
 */
const {
  getServiceSupabase,
  requireAdmin,
  parseMultipart,
  uploadAndGetPublicUrl,
  json,
} = require('./_utils');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  // Archivos grandes no llegan aquí: Vercel corta antes con 413. Usar upload-prepare + upload-commit.

  try {
    const supabase = getServiceSupabase();
    await requireAdmin(req, supabase);

    const { file } = await parseMultipart(req);
    if (!file?.buffer?.length) return json(res, 400, { error: 'Falta archivo (file)' });

    const ts = Date.now();
    const safeName = (file.filename || 'wallpaper').replace(/[^\w.\-]+/g, '_');
    const objectPath = `wallpaper/${ts}_${safeName}`;

    const publicUrl = await uploadAndGetPublicUrl(
      supabase,
      'wallpaper',
      objectPath,
      file.buffer,
      file.mimetype || 'application/octet-stream'
    );

    const { error: dbErr } = await supabase
      .from('site_config')
      .upsert({ key: 'wallpaper_url', value: publicUrl }, { onConflict: 'key' });

    if (dbErr) return json(res, 500, { error: dbErr.message });

    return json(res, 200, { ok: true, key: 'wallpaper_url', url: publicUrl, objectPath });
  } catch (e) {
    return json(res, e.statusCode || 500, { error: e.message || 'Error' });
  }
};

