const { getServiceSupabase, requireAdmin, readJsonBody, json } = require('./_utils');

function safeFilename(name) {
  return String(name || 'file').replace(/[^\w.\-]+/g, '_');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  try {
    const supabase = getServiceSupabase();
    await requireAdmin(req, supabase);

    const body = await readJsonBody(req);
    const kind = String(body.kind || '');
    const filename = safeFilename(body.filename);
    const contentType = body.contentType ? String(body.contentType) : 'application/octet-stream';

    const ts = Date.now();
    let bucket = null;
    let objectPath = null;

    if (kind === 'wallpaper') {
      bucket = 'wallpaper';
      objectPath = `wallpaper/${ts}_${filename}`;
    } else if (kind === 'comic_icon') {
      bucket = 'comic';
      objectPath = `comic/icon/${ts}_${filename}`;
    } else if (kind === 'comic_page') {
      const sort_order = Number(body.sort_order);
      if (!Number.isFinite(sort_order)) return json(res, 400, { error: 'sort_order inválido' });
      bucket = 'comic';
      objectPath = `comic/pages/${sort_order}_${ts}_${filename}`;
    } else if (kind === 'gallery_item') {
      const type = String(body.type || '').toLowerCase();
      if (type !== 'image' && type !== 'video') return json(res, 400, { error: "type debe ser 'image' o 'video'" });
      bucket = 'gallery';
      objectPath = `gallery/items/${type}/${ts}_${filename}`;
    } else {
      return json(res, 400, { error: 'kind inválido' });
    }

    const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(objectPath);
    if (error) return json(res, 500, { error: error.message, bucket, objectPath });

    const { data: pub } = supabase.storage.from(bucket).getPublicUrl(objectPath);
    const publicUrl = pub?.publicUrl;

    return json(res, 200, {
      ok: true,
      bucket,
      objectPath,
      token: data?.token,
      signedUrl: data?.signedUrl,
      publicUrl,
      contentType,
    });
  } catch (e) {
    return json(res, e.statusCode || 500, { error: e.message || 'Error' });
  }
};

