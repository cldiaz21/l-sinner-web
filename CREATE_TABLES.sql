-- =====================================================
-- SCRIPT PARA CREAR LAS TABLAS EN SUPABASE
-- =====================================================
-- Copia y pega este código en el SQL Editor de Supabase
-- Ve a: https://mpabxhfrceyjizsebzvw.supabase.co
-- Luego: SQL Editor > New Query > Pega este código > Run
-- =====================================================

-- Tabla de proyectos
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  videos JSONB DEFAULT '[]'::jsonb,
  date TIMESTAMP WITH TIME ZONE,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Tabla de imágenes del carrusel
CREATE TABLE IF NOT EXISTS carousel_images (
  id BIGSERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Crear índice para proyectos destacados
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured) WHERE featured = true;

-- Habilitar RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousel_images ENABLE ROW LEVEL SECURITY;

-- Políticas para projects
-- Lectura pública (todos pueden ver los proyectos)
CREATE POLICY "Public read access" ON projects
  FOR SELECT
  USING (true);

-- Solo usuarios autenticados pueden insertar
CREATE POLICY "Authenticated insert access" ON projects
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Solo usuarios autenticados pueden actualizar
CREATE POLICY "Authenticated update access" ON projects
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Solo usuarios autenticados pueden eliminar
CREATE POLICY "Authenticated delete access" ON projects
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Políticas para carousel_images
-- Lectura pública (todos pueden ver las imágenes del carrusel)
CREATE POLICY "Public read access" ON carousel_images
  FOR SELECT
  USING (true);

-- Solo usuarios autenticados pueden insertar
CREATE POLICY "Authenticated insert access" ON carousel_images
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Solo usuarios autenticados pueden eliminar
CREATE POLICY "Authenticated delete access" ON carousel_images
  FOR DELETE
  USING (auth.role() = 'authenticated');

