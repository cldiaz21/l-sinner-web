# 📋 Instrucciones para Configurar Supabase

## ✅ Paso 1: Variables de Entorno (YA CONFIGURADO)
El archivo `.env` ya está creado con tus credenciales de Supabase.

## 🔧 Paso 2: Crear las Tablas en Supabase

### Opción A: Usar el SQL Editor (RECOMENDADO)

1. **Abre tu proyecto en Supabase:**
   - Ve a: https://mpabxhfrceyjizsebzvw.supabase.co
   - Inicia sesión con tu cuenta de Supabase

2. **Abre el SQL Editor:**
   - En el menú lateral izquierdo, haz clic en **"SQL Editor"**
   - Haz clic en **"New Query"** (botón verde arriba a la derecha)

3. **Copia y pega el SQL:**
   - Abre el archivo `CREATE_TABLES.sql` en este proyecto
   - **Copia todo el contenido** del archivo
   - **Pega** el código en el editor SQL de Supabase

4. **Ejecuta el código:**
   - Haz clic en el botón **"Run"** (o presiona `Ctrl + Enter`)
   - Deberías ver un mensaje de éxito: "Success. No rows returned"

5. **Verifica que las tablas se crearon:**
   - Ve a **"Table Editor"** en el menú lateral
   - Deberías ver dos tablas: `projects` y `carousel_images`

### Opción B: Usar el Table Editor (Alternativa)

Si prefieres crear las tablas manualmente:

1. Ve a **"Table Editor"** > **"New Table"**
2. Crea la tabla `projects` con estos campos:
   - `id` (bigint, primary key, auto increment)
   - `title` (text, not null)
   - `description` (text, nullable)
   - `category` (text, nullable)
   - `images` (jsonb, default: `[]`)
   - `videos` (jsonb, default: `[]`)
   - `date` (timestamptz, nullable)
   - `featured` (boolean, default: false)
   - `created_at` (timestamptz, default: now())
   - `updated_at` (timestamptz, default: now())

3. Crea la tabla `carousel_images` con estos campos:
   - `id` (bigint, primary key, auto increment)
   - `image_url` (text, not null)
   - `created_at` (timestamptz, default: now())

4. **Habilitar RLS:**
   - En cada tabla, ve a **"Settings"** > **"Enable RLS"**

5. **Crear las políticas:**
   - Ve a **"Authentication"** > **"Policies"**
   - Crea las políticas según el archivo `CREATE_TABLES.sql`

## 👤 Paso 3: Crear Usuario Administrador

1. **Ve a Authentication:**
   - En el menú lateral, haz clic en **"Authentication"**
   - Luego haz clic en **"Users"**

2. **Crear nuevo usuario:**
   - Haz clic en **"Add User"** > **"Create new user"**
   - Ingresa un **Email** (ej: admin@lsinner.com)
   - Ingresa una **Password** (guarda esta contraseña)
   - **NO marques** "Auto Confirm User"
   - Haz clic en **"Create User"**

3. **Confirmar el usuario:**
   - En la lista de usuarios, busca el usuario que acabas de crear
   - Haz clic en los **tres puntos** (...) al lado del usuario
   - Selecciona **"Send Magic Link"** o **"Send Password Reset"**
   - O simplemente marca el usuario como **"Confirmed"** manualmente

## 🔐 Paso 4: Configurar Autenticación

1. **Ve a Authentication > Settings:**
   - Asegúrate de que **"Enable Email Signup"** esté activado
   - Configura las opciones según tus necesidades

## ✅ Paso 5: Verificar que Todo Funciona

1. **Reinicia el servidor de desarrollo:**
   ```bash
   npm start
   ```

2. **Prueba el login:**
   - Ve a: http://localhost:3000/login
   - Usa el email y contraseña del usuario que creaste
   - Deberías poder iniciar sesión y acceder al dashboard

3. **Prueba crear un proyecto:**
   - En el dashboard, haz clic en **"+ Nuevo Proyecto"**
   - Completa el formulario y guarda
   - El proyecto debería aparecer en la lista

## 🎯 Resumen Rápido

1. ✅ Variables de entorno configuradas (`.env`)
2. ⏳ Crear tablas en Supabase (SQL Editor)
3. ⏳ Crear usuario administrador
4. ⏳ Probar login y dashboard

## 📝 Notas Importantes

- **No compartas** tu clave de Supabase públicamente
- El archivo `.env` está en `.gitignore`, así que no se subirá al repositorio
- Las políticas RLS permiten que cualquiera pueda **leer** los proyectos, pero solo usuarios autenticados pueden **crear/editar/eliminar**
- Si tienes problemas, revisa la consola del navegador para ver los errores

## 🆘 Solución de Problemas

### Error: "relation does not exist"
- Las tablas no se crearon correctamente
- Ejecuta el SQL de nuevo en el SQL Editor

### Error: "permission denied"
- Las políticas RLS no están configuradas
- Verifica que las políticas estén creadas en Supabase

### Error: "Invalid API key"
- Verifica que las variables de entorno estén correctas
- Reinicia el servidor después de cambiar `.env`

### No puedo iniciar sesión
- Verifica que el usuario esté confirmado en Supabase
- Verifica que el email y contraseña sean correctos
- Revisa la consola del navegador para ver errores

