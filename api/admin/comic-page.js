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
    const sortOrderRaw = fields.sort_order;
    const sort_order = Number(sortOrderRaw);

    if (!Number.isFinite(sort_order)) return json(res, 400, { error: 'sort_order inválido' });
    if (!file?.buffer?.length) return json(res, 400, { error: 'Falta archivo (file)' });

    const ts = Date.now();
    const safeName = (file.filename || 'page').replace(/[^\w.\-]+/g, '_');
    const objectPath = `comic/pages/${sort_order}_${ts}_${safeName}`;

    const publicUrl = await uploadAndGetPublicUrl(
      supabase,
      'comic',
      objectPath,
      file.buffer,
      file.mimetype || 'application/octet-stream'
    );

    const { data: inserted, error: dbErr } = await supabase
      .from('comic_pages')
      .insert({ sort_order, image_url: publicUrl })
      .select('id, sort_order, image_url, created_at')
      .single();

    if (dbErr) return json(res, 500, { error: dbErr.message });

    return json(res, 200, { ok: true, page: inserted, objectPath });
  } catch (e) {
    return json(res, e.statusCode || 500, { error: e.message || 'Error' });
  }
};

