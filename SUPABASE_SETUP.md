# Configuración de Supabase

## Paso 1: Crear proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Anota la URL del proyecto y la clave anónima (anon key)

## Paso 2: Configurar variables de entorno

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` y agrega tus credenciales de Supabase:
   ```
   REACT_APP_SUPABASE_URL=https://tu-proyecto.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=tu-clave-anon-key
   ```

## Paso 3: Crear las tablas en Supabase

### Tabla: projects

Ejecuta este SQL en el editor SQL de Supabase:

```sql
-- Crear tabla de proyectos
CREATE TABLE projects (
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

-- Crear índice para proyectos destacados
CREATE INDEX idx_projects_featured ON projects(featured) WHERE featured = true;

-- Habilitar RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública
CREATE POLICY "Public read access" ON projects
  FOR SELECT
  USING (true);

-- Política para permitir inserción solo a usuarios autenticados
CREATE POLICY "Authenticated insert access" ON projects
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir actualización solo a usuarios autenticados
CREATE POLICY "Authenticated update access" ON projects
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Política para permitir eliminación solo a usuarios autenticados
CREATE POLICY "Authenticated delete access" ON projects
  FOR DELETE
  USING (auth.role() = 'authenticated');
```

### Tabla: carousel_images

```sql
-- Crear tabla de imágenes del carrusel
CREATE TABLE carousel_images (
  id BIGSERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Habilitar RLS
ALTER TABLE carousel_images ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública
CREATE POLICY "Public read access" ON carousel_images
  FOR SELECT
  USING (true);

-- Política para permitir inserción solo a usuarios autenticados
CREATE POLICY "Authenticated insert access" ON carousel_images
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir eliminación solo a usuarios autenticados
CREATE POLICY "Authenticated delete access" ON carousel_images
  FOR DELETE
  USING (auth.role() = 'authenticated');
```

## Paso 4: Crear usuario administrador

1. Ve a Authentication > Users en el panel de Supabase
2. Haz clic en "Add User" > "Create new user"
3. Ingresa el email y contraseña para el administrador
4. Guarda las credenciales (las necesitarás para iniciar sesión)

## Paso 5: Configurar autenticación

1. Ve a Authentication > Settings en el panel de Supabase
2. Asegúrate de que "Enable Email Signup" esté activado
3. Configura las opciones de autenticación según tus necesidades

## Paso 6: Reiniciar la aplicación

Después de configurar las variables de entorno, reinicia el servidor de desarrollo:

```bash
npm start
```

## Notas importantes

- **Seguridad**: Las políticas RLS están configuradas para permitir lectura pública pero solo usuarios autenticados pueden crear, actualizar o eliminar proyectos.
- **Almacenamiento**: Si quieres subir archivos directamente a Supabase Storage, necesitarás configurar un bucket y políticas adicionales.
- **URLs de imágenes**: Por ahora, el sistema usa URLs externas. Para usar Supabase Storage, necesitarás implementar la subida de archivos.

## Solución de problemas

### Error: "Missing Supabase environment variables"
- Asegúrate de que el archivo `.env` existe y tiene las variables correctas
- Reinicia el servidor de desarrollo después de crear/editar `.env`

### Error: "Invalid API key"
- Verifica que la clave anónima (anon key) sea correcta
- Asegúrate de que estés usando la clave "anon" y no la clave "service_role"

### Error: "permission denied"
- Verifica que las políticas RLS estén correctamente configuradas
- Asegúrate de que el usuario esté autenticado antes de intentar crear/editar/eliminar

