# 📸 Imágenes del Hero Section

## 📁 Dónde colocar las imágenes:

Coloca tus imágenes JPG directamente en esta carpeta:
```
public/images/hero/
```

## 📋 Nombres de archivo:

Nombra tus imágenes como:
- `hero-1.jpg`
- `hero-2.jpg`
- `hero-3.jpg`
- `hero-4.jpg`

O usa los nombres que prefieras y actualiza el array en `src/pages/Home/Home.js`

## 🎨 Especificaciones recomendadas:

- **Formato**: JPG (también funciona PNG, WEBP)
- **Resolución**: 1920x1080px o superior (relación 16:9)
- **Tamaño**: Optimiza para web (máx. 500KB - 1MB por imagen)
- **Calidad**: Alta calidad pero comprimida para carga rápida

## 💡 Cómo agregar más imágenes:

1. Coloca las imágenes en esta carpeta: `public/images/hero/`
2. Abre el archivo: `src/pages/Home/Home.js`
3. Modifica el array `heroImages` agregando las rutas de tus imágenes:

```javascript
const heroImages = [
  '/images/hero/hero-1.jpg',
  '/images/hero/hero-2.jpg',
  '/images/hero/hero-3.jpg',
  '/images/hero/hero-4.jpg',
  '/images/hero/tu-imagen.jpg', // Agrega más aquí
];
```

## ⚙️ Características del carrusel:

- ✅ Cambio automático cada 5 segundos
- ✅ Efecto fade suave entre imágenes
- ✅ Overlay oscuro para mejor legibilidad del texto
- ✅ Partículas animadas sobre las imágenes
- ✅ Responsive y optimizado para móviles

## 🔍 Verificación:

Después de colocar las imágenes, reinicia el servidor de desarrollo:
```bash
npm start
```

Las imágenes deberían aparecer automáticamente en el hero section del home.

