# 📦 Configuración Rápida de Supabase Storage

## 🚀 Pasos Rápidos

### 1. Crear el Bucket

1. Ve a [Supabase Dashboard](https://app.supabase.com) > Tu Proyecto > **Storage**
2. Haz clic en **New bucket**
3. Configura:
   - **Name**: `images`
   - **Public bucket**: ✅ **SÍ (marcar)**
   - **File size limit**: `10 MB`
4. Haz clic en **Create bucket**

### 2. Configurar Políticas (RLS)

1. Ve a **Storage** > **Policies**
2. Haz clic en **New Policy** > **For full customization**

#### Política 1: Lectura Pública
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );
```
- Operation: `SELECT`

#### Política 2: Subir (Usuarios Autenticados)
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);
```
- Operation: `INSERT`

#### Política 3: Actualizar (Usuarios Autenticados)
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
- Operation: `UPDATE`

#### Política 4: Eliminar (Usuarios Autenticados)
```sql
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);
```
- Operation: `DELETE`

### 3. ¡Listo!

Ya puedes subir imágenes desde el panel de administración. Las imágenes se guardarán automáticamente en:
- `projects/` - Para imágenes de proyectos
- `carousel/` - Para imágenes del carrusel

## ✅ Verificación

1. Inicia sesión en el admin
2. Ve a "Proyectos" > "Nuevo Proyecto"
3. Haz clic en "Subir Archivo"
4. Selecciona una imagen
5. Verifica que se suba correctamente

## 🐛 Problemas Comunes

**Error: "Bucket not found"**
- Verifica que el bucket se llame exactamente `images` (minúsculas)

**Error: "new row violates row-level security policy"**
- Verifica que todas las políticas estén activas
- Asegúrate de estar autenticado

**Las imágenes no se muestran**
- Verifica que el bucket esté marcado como público
- Verifica que la política "Public Access" esté activa

