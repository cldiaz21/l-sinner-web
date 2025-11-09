# 🔧 Configurar Variables de Entorno en Vercel

## ⚠️ Problema
El error "Missing Supabase environment variables" ocurre porque las variables de entorno no están configuradas en Vercel.

## ✅ Solución: Configurar Variables en Vercel

### Paso 1: Ir a la Configuración de Vercel

1. Ve a tu proyecto en Vercel: https://vercel.com
2. Selecciona tu proyecto `l-sinner-web`
3. Ve a **Settings** (Configuración)
4. Haz clic en **Environment Variables** (Variables de Entorno)

### Paso 2: Agregar las Variables

Agrega estas dos variables de entorno:

#### Variable 1:
- **Key:** `REACT_APP_SUPABASE_URL`
- **Value:** `https://mpabxhfrceyjizsebzvw.supabase.co`
- **Environment:** Selecciona todas (Production, Preview, Development)

#### Variable 2:
- **Key:** `REACT_APP_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYWJ4aGZyY2V5aml6c2VienZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NDY5NDUsImV4cCI6MjA3ODIyMjk0NX0.jZO81fQHpIw-ybFU3XnwicPCjeok8C0rap1riDluPWY`
- **Environment:** Selecciona todas (Production, Preview, Development)

### Paso 3: Reiniciar el Deployment

Después de agregar las variables:

1. Ve a la pestaña **Deployments**
2. Encuentra el último deployment
3. Haz clic en los **tres puntos** (...)
4. Selecciona **Redeploy**
5. O simplemente haz un nuevo push al repositorio

### Paso 4: Verificar

Después del redeploy, verifica que:
- El build se complete sin errores
- La aplicación cargue correctamente
- No aparezca el error de variables de entorno

## 📝 Notas Importantes

- Las variables de entorno en Vercel deben comenzar con `REACT_APP_` para que React las pueda usar
- Después de agregar las variables, **debes hacer un redeploy** para que surtan efecto
- El archivo `.env` local solo funciona en desarrollo, por eso necesitas configurarlas en Vercel

## 🎯 Valores a Copiar y Pegar

### REACT_APP_SUPABASE_URL
```
https://mpabxhfrceyjizsebzvw.supabase.co
```

### REACT_APP_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYWJ4aGZyY2V5aml6c2VienZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NDY5NDUsImV4cCI6MjA3ODIyMjk0NX0.jZO81fQHpIw-ybFU3XnwicPCjeok8C0rap1riDluPWY
```

## 🚀 Alternativa: Usar Vercel CLI

Si prefieres usar la línea de comandos:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Configurar variables
vercel env add REACT_APP_SUPABASE_URL
vercel env add REACT_APP_SUPABASE_ANON_KEY

# Luego hacer redeploy
vercel --prod
```

## ✅ Después de Configurar

Una vez configuradas las variables y hecho el redeploy:
1. La aplicación debería funcionar correctamente
2. Podrás iniciar sesión en el dashboard
3. Podrás crear y gestionar proyectos

