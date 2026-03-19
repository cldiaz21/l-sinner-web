import React, { useMemo, useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { authService } from '../../services/authService';
import './AdminContent.css';

async function authFetch(url, formData) {
  const { session, error } = await authService.getSession();
  if (error) throw new Error(error.message || 'No se pudo obtener la sesión');
  if (!session?.access_token) throw new Error('No hay sesión activa');

  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${session.access_token}` },
    body: formData,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Error HTTP ${res.status}`);
  }
  return data;
}

export default function AdminContent() {
  // Wallpaper
  const [wallpaperFile, setWallpaperFile] = useState(null);
  const wallpaperPreview = useMemo(() => (wallpaperFile ? URL.createObjectURL(wallpaperFile) : null), [wallpaperFile]);
  const [wallpaperResult, setWallpaperResult] = useState(null);
  const [wallpaperLoading, setWallpaperLoading] = useState(false);
  const [wallpaperError, setWallpaperError] = useState('');

  // Comic icon
  const [iconFile, setIconFile] = useState(null);
  const iconPreview = useMemo(() => (iconFile ? URL.createObjectURL(iconFile) : null), [iconFile]);
  const [iconResult, setIconResult] = useState(null);
  const [iconLoading, setIconLoading] = useState(false);
  const [iconError, setIconError] = useState('');

  // Comic page
  const [pageFile, setPageFile] = useState(null);
  const pagePreview = useMemo(() => (pageFile ? URL.createObjectURL(pageFile) : null), [pageFile]);
  const [pageSortOrder, setPageSortOrder] = useState('');
  const [pageResult, setPageResult] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState('');

  // Gallery item
  const [galleryFile, setGalleryFile] = useState(null);
  const galleryPreview = useMemo(() => (galleryFile ? URL.createObjectURL(galleryFile) : null), [galleryFile]);
  const [galleryType, setGalleryType] = useState('image');
  const [galleryTitle, setGalleryTitle] = useState('');
  const [gallerySortOrder, setGallerySortOrder] = useState('');
  const [galleryResult, setGalleryResult] = useState(null);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryError, setGalleryError] = useState('');

  const onUploadWallpaper = async () => {
    setWallpaperError('');
    setWallpaperResult(null);
    if (!wallpaperFile) return setWallpaperError('Selecciona un archivo');
    setWallpaperLoading(true);
    try {
      const fd = new FormData();
      fd.append('file', wallpaperFile);
      const data = await authFetch('/api/admin/wallpaper', fd);
      setWallpaperResult(data);
    } catch (e) {
      setWallpaperError(e.message);
    } finally {
      setWallpaperLoading(false);
    }
  };

  const onUploadIcon = async () => {
    setIconError('');
    setIconResult(null);
    if (!iconFile) return setIconError('Selecciona un archivo');
    setIconLoading(true);
    try {
      const fd = new FormData();
      fd.append('file', iconFile);
      const data = await authFetch('/api/admin/comic-icon', fd);
      setIconResult(data);
    } catch (e) {
      setIconError(e.message);
    } finally {
      setIconLoading(false);
    }
  };

  const onUploadPage = async () => {
    setPageError('');
    setPageResult(null);
    if (!pageFile) return setPageError('Selecciona un archivo');
    const sort_order = Number(pageSortOrder);
    if (!Number.isFinite(sort_order)) return setPageError('sort_order inválido');
    setPageLoading(true);
    try {
      const fd = new FormData();
      fd.append('file', pageFile);
      fd.append('sort_order', String(sort_order));
      const data = await authFetch('/api/admin/comic-page', fd);
      setPageResult(data);
    } catch (e) {
      setPageError(e.message);
    } finally {
      setPageLoading(false);
    }
  };

  const onUploadGallery = async () => {
    setGalleryError('');
    setGalleryResult(null);
    if (!galleryFile) return setGalleryError('Selecciona un archivo');
    const sort_order = Number(gallerySortOrder);
    if (!Number.isFinite(sort_order)) return setGalleryError('sort_order inválido');
    setGalleryLoading(true);
    try {
      const fd = new FormData();
      fd.append('file', galleryFile);
      fd.append('type', galleryType);
      fd.append('title', galleryTitle);
      fd.append('sort_order', String(sort_order));
      const data = await authFetch('/api/admin/gallery-item', fd);
      setGalleryResult(data);
    } catch (e) {
      setGalleryError(e.message);
    } finally {
      setGalleryLoading(false);
    }
  };

  return (
    <div className="admin-content-grid">
      <Card className="admin-card">
        <Card.Header className="admin-card-header">
          <h5 className="admin-card-title mb-0">Wallpaper</h5>
        </Card.Header>
        <Card.Body>
          {wallpaperError && <Alert variant="danger">{wallpaperError}</Alert>}
          <Form.Group className="admin-form-group">
            <Form.Label className="admin-form-label">Archivo</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={(e) => setWallpaperFile(e.target.files?.[0] || null)} />
          </Form.Group>
          {wallpaperPreview && <img className="admin-content-preview" src={wallpaperPreview} alt="preview wallpaper" />}
          <div className="d-flex gap-2 align-items-center mt-3">
            <Button className="admin-btn admin-btn-primary" onClick={onUploadWallpaper} disabled={wallpaperLoading}>
              {wallpaperLoading ? 'Subiendo…' : 'Subir'}
            </Button>
            {wallpaperResult?.url && (
              <a href={wallpaperResult.url} target="_blank" rel="noreferrer">
                Ver URL
              </a>
            )}
          </div>
          {wallpaperResult?.url && <div className="text-muted small mt-2">`site_config.wallpaper_url` = {wallpaperResult.url}</div>}
        </Card.Body>
      </Card>

      <Card className="admin-card">
        <Card.Header className="admin-card-header">
          <h5 className="admin-card-title mb-0">Comic Icon</h5>
        </Card.Header>
        <Card.Body>
          {iconError && <Alert variant="danger">{iconError}</Alert>}
          <Form.Group className="admin-form-group">
            <Form.Label className="admin-form-label">Archivo</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={(e) => setIconFile(e.target.files?.[0] || null)} />
          </Form.Group>
          {iconPreview && <img className="admin-content-preview admin-content-preview--small" src={iconPreview} alt="preview icon" />}
          <div className="d-flex gap-2 align-items-center mt-3">
            <Button className="admin-btn admin-btn-primary" onClick={onUploadIcon} disabled={iconLoading}>
              {iconLoading ? 'Subiendo…' : 'Subir'}
            </Button>
            {iconResult?.url && (
              <a href={iconResult.url} target="_blank" rel="noreferrer">
                Ver URL
              </a>
            )}
          </div>
          {iconResult?.url && <div className="text-muted small mt-2">`site_config.comic_icon_url` = {iconResult.url}</div>}
        </Card.Body>
      </Card>

      <Card className="admin-card">
        <Card.Header className="admin-card-header">
          <h5 className="admin-card-title mb-0">Comic Pages</h5>
        </Card.Header>
        <Card.Body>
          {pageError && <Alert variant="danger">{pageError}</Alert>}
          <Form.Group className="admin-form-group">
            <Form.Label className="admin-form-label">Archivo</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={(e) => setPageFile(e.target.files?.[0] || null)} />
          </Form.Group>
          <Form.Group className="admin-form-group mt-2">
            <Form.Label className="admin-form-label">sort_order</Form.Label>
            <Form.Control value={pageSortOrder} onChange={(e) => setPageSortOrder(e.target.value)} placeholder="1" />
          </Form.Group>
          {pagePreview && <img className="admin-content-preview" src={pagePreview} alt="preview page" />}
          <div className="d-flex gap-2 align-items-center mt-3">
            <Button className="admin-btn admin-btn-primary" onClick={onUploadPage} disabled={pageLoading}>
              {pageLoading ? 'Subiendo…' : 'Subir'}
            </Button>
            {pageResult?.page?.image_url && (
              <a href={pageResult.page.image_url} target="_blank" rel="noreferrer">
                Ver URL
              </a>
            )}
          </div>
          {pageResult?.page && (
            <div className="text-muted small mt-2">
              Insertado: sort_order {pageResult.page.sort_order} · {pageResult.page.image_url}
            </div>
          )}
        </Card.Body>
      </Card>

      <Card className="admin-card">
        <Card.Header className="admin-card-header">
          <h5 className="admin-card-title mb-0">Gallery</h5>
        </Card.Header>
        <Card.Body>
          {galleryError && <Alert variant="danger">{galleryError}</Alert>}
          <Form.Group className="admin-form-group">
            <Form.Label className="admin-form-label">Tipo</Form.Label>
            <Form.Select value={galleryType} onChange={(e) => setGalleryType(e.target.value)}>
              <option value="image">image</option>
              <option value="video">video</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="admin-form-group mt-2">
            <Form.Label className="admin-form-label">Título (opcional)</Form.Label>
            <Form.Control value={galleryTitle} onChange={(e) => setGalleryTitle(e.target.value)} placeholder="Título" />
          </Form.Group>
          <Form.Group className="admin-form-group mt-2">
            <Form.Label className="admin-form-label">sort_order</Form.Label>
            <Form.Control value={gallerySortOrder} onChange={(e) => setGallerySortOrder(e.target.value)} placeholder="1" />
          </Form.Group>
          <Form.Group className="admin-form-group mt-2">
            <Form.Label className="admin-form-label">Archivo</Form.Label>
            <Form.Control
              type="file"
              accept={galleryType === 'image' ? 'image/*' : 'video/*'}
              onChange={(e) => setGalleryFile(e.target.files?.[0] || null)}
            />
          </Form.Group>

          {galleryPreview && galleryType === 'image' && (
            <img className="admin-content-preview" src={galleryPreview} alt="preview gallery" />
          )}
          {galleryPreview && galleryType === 'video' && (
            <video className="admin-content-preview" src={galleryPreview} controls />
          )}

          <div className="d-flex gap-2 align-items-center mt-3">
            <Button className="admin-btn admin-btn-primary" onClick={onUploadGallery} disabled={galleryLoading}>
              {galleryLoading ? 'Subiendo…' : 'Subir'}
            </Button>
            {galleryResult?.item?.url && (
              <a href={galleryResult.item.url} target="_blank" rel="noreferrer">
                Ver URL
              </a>
            )}
          </div>
          {galleryResult?.item && (
            <div className="text-muted small mt-2">
              Insertado: {galleryResult.item.type} · sort_order {galleryResult.item.sort_order} · {galleryResult.item.url}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

