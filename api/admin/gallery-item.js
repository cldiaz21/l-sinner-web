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

    const { fields, file } = await parseMultipart(req);
    const type = (fields.type || '').toLowerCase();
    const title = fields.title ? String(fields.title) : null;
    const sort_order = Number(fields.sort_order);

    if (type !== 'image' && type !== 'video') return json(res, 400, { error: "type debe ser 'image' o 'video'" });
    if (!Number.isFinite(sort_order)) return json(res, 400, { error: 'sort_order inválido' });
    if (!file?.buffer?.length) return json(res, 400, { error: 'Falta archivo (file)' });

    const ts = Date.now();
    const safeName = (file.filename || 'item').replace(/[^\w.\-]+/g, '_');
    const objectPath = `gallery/items/${type}/${ts}_${safeName}`;

    const publicUrl = await uploadAndGetPublicUrl(
      supabase,
      'gallery',
      objectPath,
      file.buffer,
      file.mimetype || 'application/octet-stream'
    );

    const { data: inserted, error: dbErr } = await supabase
      .from('gallery_items')
      .insert({ type, url: publicUrl, title, sort_order })
      .select('id, type, url, title, sort_order, created_at')
      .single();

    if (dbErr) return json(res, 500, { error: dbErr.message });

    return json(res, 200, { ok: true, item: inserted, objectPath });
  } catch (e) {
    return json(res, e.statusCode || 500, { error: e.message || 'Error' });
  }
};

