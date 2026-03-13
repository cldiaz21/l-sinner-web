-- Ejecutar en Supabase SQL Editor para permitir reordenar el carrusel por arrastre.

-- Añadir columna position si no existe
ALTER TABLE carousel_images ADD COLUMN IF NOT EXISTS position INTEGER NOT NULL DEFAULT 0;

-- Opcional: asignar posición a filas existentes según created_at (ejecutar una vez)
-- UPDATE carousel_images SET position = sub.rn - 1
-- FROM (
--   SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn FROM carousel_images
-- ) sub
-- WHERE carousel_images.id = sub.id;
