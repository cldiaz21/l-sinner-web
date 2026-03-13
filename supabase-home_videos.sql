-- Ejecutar en Supabase SQL Editor para crear la tabla de videos de la home.
-- Los videos son enlaces de YouTube que se muestran en la sección "Videos" y se ordenan desde el admin.

CREATE TABLE IF NOT EXISTS home_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Permitir acceso para la app (ajusta RLS según tu política)
ALTER TABLE home_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON home_videos FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON home_videos FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON home_videos FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON home_videos FOR DELETE USING (auth.role() = 'authenticated');
