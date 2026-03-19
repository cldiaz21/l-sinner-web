const { getServiceSupabase, requireAdmin, json } = require('./_utils');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  try {
    const supabase = getServiceSupabase();
    await requireAdmin(req, supabase);

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const kind = String(body.kind || '');
    const publicUrl = body.publicUrl ? String(body.publicUrl) : '';

    if (!publicUrl) return json(res, 400, { error: 'publicUrl requerido' });

    if (kind === 'wallpaper') {
      const { error } = await supabase
        .from('site_config')
        .upsert({ key: 'wallpaper_url', value: publicUrl }, { onConflict: 'key' });
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { ok: true, key: 'wallpaper_url', url: publicUrl });
    }

    if (kind === 'comic_icon') {
      const { error } = await supabase
        .from('site_config')
        .upsert({ key: 'comic_icon_url', value: publicUrl }, { onConflict: 'key' });
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { ok: true, key: 'comic_icon_url', url: publicUrl });
    }

    if (kind === 'comic_page') {
      const sort_order = Number(body.sort_order);
      if (!Number.isFinite(sort_order)) return json(res, 400, { error: 'sort_order inválido' });

      const { data, error } = await supabase
        .from('comic_pages')
        .insert({ sort_order, image_url: publicUrl })
        .select('id, sort_order, image_url, created_at')
        .single();
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { ok: true, page: data });
    }

    if (kind === 'gallery_item') {
      const type = String(body.type || '').toLowerCase();
      const title = body.title ? String(body.title) : null;
      const sort_order = Number(body.sort_order);
      if (type !== 'image' && type !== 'video') return json(res, 400, { error: "type debe ser 'image' o 'video'" });
      if (!Number.isFinite(sort_order)) return json(res, 400, { error: 'sort_order inválido' });

      const { data, error } = await supabase
        .from('gallery_items')
        .insert({ type, url: publicUrl, title, sort_order })
        .select('id, type, url, title, sort_order, created_at')
        .single();
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { ok: true, item: data });
    }

    return json(res, 400, { error: 'kind inválido' });
  } catch (e) {
    return json(res, e.statusCode || 500, { error: e.message || 'Error' });
  }
};

