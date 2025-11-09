# 📦 Configuración de Supabase Storage para Subida de Imágenes

Esta guía te ayudará a configurar Supabase Storage para permitir la subida de imágenes desde el panel de administración.

## 📋 Pasos para Configurar Storage

### 1. Crear el Bucket de Storage

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. En el menú lateral, haz clic en **Storage**
3. Haz clic en **New bucket**
4. Configura el bucket:
   - **Name**: `images`
   - **Public bucket**: ✅ **Marcar como público** (esto permite que las imágenes sean accesibles públicamente)
   - **File size limit**: `10 MB` (o el tamaño que prefieras)
   - **Allowed MIME types**: `image/jpeg, image/png, image/webp, image/gif` (opcional, para restringir tipos de archivo)
5. Haz clic en **Create bucket**

### 2. Configurar Políticas de Seguridad (RLS)

1. En el bucket `images`, haz clic en **Policies**
2. Haz clic en **New Policy**
3. Selecciona **For full customization**, luego haz clic en **Use this template**

#### Política 1: Permitir lectura pública (SELECT)

```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );
```

- **Policy name**: `Public Access`
- **Allowed operation**: `SELECT`
- **Policy definition**: Usa el SQL de arriba
- Haz clic en **Review** y luego **Save policy**

#### Política 2: Permitir subida de archivos a usuarios autenticados (INSERT)

```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);
```

- **Policy name**: `Authenticated users can upload`
- **Allowed operation**: `INSERT`
- **Policy definition**: Usa el SQL de arriba
- Haz clic en **Review** y luego **Save policy**

#### Política 3: Permitir actualización de archivos a usuarios autenticados (UPDATE)

```sql
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
)
WITH CHECK (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);
```

- **Policy name**: `Authenticated users can update`
- **Allowed operation**: `UPDATE`
- **Policy definition**: Usa el SQL de arriba
- Haz clic en **Review** y luego **Save policy**

#### Política 4: Permitir eliminación de archivos a usuarios autenticados (DELETE)

```sql
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);
```

- **Policy name**: `Authenticated users can delete`
- **Allowed operation**: `DELETE`
- **Policy definition**: Usa el SQL de arriba
- Haz clic en **Review** y luego **Save policy**

### 3. Crear Carpetas (Opcional)

Las carpetas se crearán automáticamente cuando subas archivos, pero puedes crearlas manualmente:

1. En el bucket `images`, haz clic en **New folder**
2. Crea las carpetas:
   - `projects` (para imágenes de proyectos)
   - `carousel` (para imágenes del carrusel)

### 4. Verificar la Configuración

1. Ve a **Storage** > **Policies**
2. Verifica que las 4 políticas estén activas:
   - ✅ Public Access (SELECT)
   - ✅ Authenticated users can upload (INSERT)
   - ✅ Authenticated users can update (UPDATE)
   - ✅ Authenticated users can delete (DELETE)

## 🔒 Notas de Seguridad

- **Bucket público**: El bucket está marcado como público para que las imágenes sean accesibles en la web. Si necesitas más seguridad, puedes hacerlo privado y usar URLs firmadas.
- **Autenticación requerida**: Solo los usuarios autenticados pueden subir, actualizar o eliminar imágenes.
- **Límites de tamaño**: Asegúrate de configurar límites de tamaño de archivo para evitar abusos.
- **Tipos MIME**: Puedes restringir los tipos de archivo permitidos para mayor seguridad.

## ✅ Verificación

Para verificar que todo funciona:

1. Inicia sesión en el panel de administración
2. Intenta subir una imagen en un proyecto
3. Verifica que la imagen aparezca correctamente
4. Verifica que la imagen sea accesible públicamente (copia la URL y ábrela en una pestaña privada)

## 🐛 Solución de Problemas

### Error: "new row violates row-level security policy"

- Verifica que las políticas RLS estén correctamente configuradas
- Asegúrate de que el usuario esté autenticado
- Verifica que el nombre del bucket sea exactamente `images`

### Error: "Bucket not found"

- Verifica que el bucket `images` exista
- Verifica que el nombre del bucket sea exactamente `images` (case-sensitive)

### Las imágenes no se muestran

- Verifica que el bucket esté marcado como público
- Verifica que la política "Public Access" esté activa
- Verifica la URL de la imagen en el navegador

## 📚 Referencias

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Storage Policies](https://supabase.com/docs/guides/storage/security/access-control)

