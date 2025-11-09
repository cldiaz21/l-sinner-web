# 📤 Instrucciones para subir el código a GitHub

## Pasos para subir el proyecto al repositorio

### 1. Inicializar Git (si no está inicializado)
```bash
git init
```

### 2. Agregar el repositorio remoto
```bash
git remote add origin https://github.com/cldiaz21/l-sinner-web.git
```

Si ya existe un remoto, puedes actualizarlo con:
```bash
git remote set-url origin https://github.com/cldiaz21/l-sinner-web.git
```

### 3. Agregar todos los archivos
```bash
git add .
```

### 4. Hacer commit
```bash
git commit -m "Initial commit: L SINNER portfolio website"
```

### 5. Cambiar a la rama main (si es necesario)
```bash
git branch -M main
```

### 6. Subir al repositorio
```bash
git push -u origin main
```

## Si el repositorio ya tiene contenido

Si el repositorio remoto tiene contenido (como un README), primero haz pull:

```bash
git pull origin main --allow-unrelated-histories
```

Luego resuelve cualquier conflicto y haz push:

```bash
git push -u origin main
```

## Comandos rápidos (todo en uno)

```bash
git init
git remote add origin https://github.com/cldiaz21/l-sinner-web.git
git add .
git commit -m "Initial commit: L SINNER portfolio website"
git branch -M main
git push -u origin main
```

## Notas importantes

- ⚠️ **NO subas el archivo `.env`** si contiene información sensible (credenciales de EmailJS, etc.)
- ✅ El `.gitignore` ya está configurado para excluir `node_modules`, `.env`, etc.
- 📸 Las imágenes en `public/images/hero/` se subirán al repositorio
- 🔐 Las credenciales del admin están en el código, considera moverlas a variables de entorno

## Variables de entorno (opcional)

Si quieres usar variables de entorno, crea un archivo `.env.example`:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
REACT_APP_ADMIN_USERNAME=admin
REACT_APP_ADMIN_PASSWORD=your_password
```

Luego crea tu propio `.env` local (que NO se subirá gracias al `.gitignore`).

