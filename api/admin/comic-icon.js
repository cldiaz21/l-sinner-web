const {
  getServiceSupabase,
  requireAdmin,
  parseMultipart,
  uploadAndGetPublicUrl,
  json,
} = require('./_utils');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  try {
    const supabase = getServiceSupabase();
    await requireAdmin(req, supabase);

    const { file } = await parseMultipart(req);
    if (!file?.buffer?.length) return json(res, 400, { error: 'Falta archivo (file)' });

    const ts = Date.now();
    const safeName = (file.filename || 'comic_icon').replace(/[^\w.\-]+/g, '_');
    const objectPath = `comic/icon/${ts}_${safeName}`;

    const publicUrl = await uploadAndGetPublicUrl(
      supabase,
      'comic',
      objectPath,
      file.buffer,
      file.mimetype || 'application/octet-stream'
    );

    const { error: dbErr } = await supabase
      .from('site_config')
      .upsert({ key: 'comic_icon_url', value: publicUrl }, { onConflict: 'key' });

    if (dbErr) return json(res, 500, { error: dbErr.message });

    return json(res, 200, { ok: true, key: 'comic_icon_url', url: publicUrl, objectPath });
  } catch (e) {
    return json(res, e.statusCode || 500, { error: e.message || 'Error' });
  }
};

