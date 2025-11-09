# 🚀 Guía de Despliegue en Vercel

## Problema Resuelto

El error `ECONNRESET` durante la instalación de dependencias en Vercel ha sido solucionado con las siguientes configuraciones:

## Archivos Creados

### 1. `vercel.json`
Configuración para Vercel que incluye:
- Comando de instalación con `--legacy-peer-deps` para manejar conflictos de dependencias
- Configuración de rewrites para React Router
- Versión de Node.js especificada

### 2. `.npmrc`
Configuración de npm que incluye:
- `legacy-peer-deps=true` - Para manejar conflictos de peer dependencies
- Timeouts aumentados para conexiones de red
- Reintentos aumentados para descargas

### 3. `package.json` actualizado
- Agregado `engines` para especificar versiones de Node y npm
- Agregado script `postinstall` para verificar la instalación

## Pasos para Desplegar

1. **Haz commit de los nuevos archivos:**
```bash
git add vercel.json .npmrc package.json
git commit -m "Fix Vercel deployment configuration"
git push
```

2. **En Vercel:**
   - El despliegue se hará automáticamente cuando hagas push
   - O puedes hacer un "Redeploy" desde el dashboard de Vercel

## Configuración en Vercel Dashboard (Opcional)

Si necesitas configurar variables de entorno:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las siguientes variables (si usas EmailJS):
   - `REACT_APP_EMAILJS_SERVICE_ID`
   - `REACT_APP_EMAILJS_TEMPLATE_ID`
   - `REACT_APP_EMAILJS_PUBLIC_KEY`
   - `REACT_APP_ADMIN_USERNAME`
   - `REACT_APP_ADMIN_PASSWORD`

## Solución de Problemas

### Si el error persiste:

1. **Verifica la versión de Node.js:**
   - Vercel debería usar Node.js 18.x (configurado en `vercel.json`)

2. **Limpia el caché de Vercel:**
   - En el dashboard de Vercel → Settings → Clear Build Cache

3. **Intenta un build local:**
   ```bash
   npm ci --legacy-peer-deps
   npm run build
   ```

4. **Verifica las dependencias:**
   - Asegúrate de que todas las dependencias estén correctamente especificadas en `package.json`

## Notas Importantes

- Los warnings de paquetes deprecados (especialmente `tsparticles`) no afectan el funcionamiento
- El flag `--legacy-peer-deps` es necesario debido a conflictos entre dependencias
- El archivo `.npmrc` mejora la estabilidad de las instalaciones en entornos de CI/CD

