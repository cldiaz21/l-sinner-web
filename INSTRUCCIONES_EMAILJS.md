# 📧 Instrucciones para Configurar EmailJS

Este documento te guiará paso a paso para conectar el formulario de contacto de L SINN3R con EmailJS.

## 📋 Requisitos Previos

- Una cuenta de EmailJS (gratuita disponible en [emailjs.com](https://www.emailjs.com/))
- Un servicio de email (Gmail, Outlook, etc.)

## 🚀 Pasos para Configurar EmailJS

### Paso 1: Crear una Cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en **"Sign Up"** (Registrarse)
3. Completa el formulario de registro
4. Verifica tu email si es necesario

### Paso 2: Agregar un Servicio de Email

1. Una vez dentro de tu cuenta, ve a **"Email Services"** en el menú lateral
2. Haz clic en **"Add New Service"** (Agregar Nuevo Servicio)
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta de email
5. **Guarda el Service ID** que se genera (ejemplo: `service_xxxxxxx`)

### Paso 3: Crear una Plantilla de Email

1. Ve a **"Email Templates"** en el menú lateral
2. Haz clic en **"Create New Template"** (Crear Nueva Plantilla)
3. Configura la plantilla con los siguientes campos:

#### Campos del Formulario:
- `{{name}}` - Nombre del usuario
- `{{email}}` - Email del usuario
- `{{subject}}` - Asunto del mensaje
- `{{message}}` - Mensaje del usuario

#### Ejemplo de Plantilla:

```
Asunto: Nuevo contacto desde L SINN3R - {{subject}}

Hola,

Has recibido un nuevo mensaje desde el formulario de contacto de L SINN3R:

Nombre: {{name}}
Email: {{email}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto de L SINN3R.
```

4. Configura el **"To Email"** (Email Destinatario) con tu dirección de email
5. Guarda la plantilla
6. **Guarda el Template ID** que se genera (ejemplo: `template_xxxxxxx`)

### Paso 4: Obtener la Public Key

1. Ve a **"Account"** en el menú lateral
2. En la sección **"API Keys"**, encontrarás tu **Public Key**
3. **Copia la Public Key** (ejemplo: `xxxxxxxxxxxxxxxxxxxx`)

### Paso 5: Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en Vercel: [https://vercel.com](https://vercel.com)
2. Selecciona tu proyecto **l-sinner-web**
3. Ve a **"Settings"** (Configuración)
4. Haz clic en **"Environment Variables"** (Variables de Entorno)
5. Agrega las siguientes variables:

#### Variable 1:
- **Name:** `REACT_APP_EMAILJS_SERVICE_ID`
- **Value:** `service_xxxxxxx` (el Service ID que obtuviste en el Paso 2)
- **Environment:** Production, Preview, Development (selecciona todos)

#### Variable 2:
- **Name:** `REACT_APP_EMAILJS_TEMPLATE_ID`
- **Value:** `template_xxxxxxx` (el Template ID que obtuviste en el Paso 3)
- **Environment:** Production, Preview, Development (selecciona todos)

#### Variable 3:
- **Name:** `REACT_APP_EMAILJS_PUBLIC_KEY`
- **Value:** `xxxxxxxxxxxxxxxxxxxx` (la Public Key que obtuviste en el Paso 4)
- **Environment:** Production, Preview, Development (selecciona todos)

6. Haz clic en **"Save"** (Guardar) para cada variable

### Paso 6: Redeploy la Aplicación

1. Después de agregar las variables de entorno, ve a **"Deployments"** en Vercel
2. Haz clic en los **tres puntos (...)** del último deployment
3. Selecciona **"Redeploy"** (Redesplegar)
4. Espera a que se complete el deployment

### Paso 7: Probar el Formulario

1. Ve a tu sitio web desplegado
2. Navega a la página de **Contacto** o desplázate hasta el formulario de contacto
3. Completa el formulario con datos de prueba
4. Haz clic en **"Enviar Mensaje"**
5. Deberías ver un mensaje de éxito
6. Revisa tu bandeja de entrada para confirmar que recibiste el email

## 🔧 Configuración Local (Opcional)

Si quieres probar el formulario localmente antes de desplegar:

1. Crea un archivo `.env` en la raíz del proyecto (si no existe)
2. Agrega las siguientes líneas:

```env
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

3. Reemplaza los valores con los que obtuviste en los pasos anteriores
4. Reinicia el servidor de desarrollo (`npm start`)

⚠️ **IMPORTANTE:** No subas el archivo `.env` a GitHub si contiene información sensible.

## 🐛 Solución de Problemas

### El formulario no envía emails

1. Verifica que las variables de entorno estén correctamente configuradas en Vercel
2. Asegúrate de que los IDs (Service ID, Template ID, Public Key) sean correctos
3. Revisa la consola del navegador para ver si hay errores
4. Verifica que el servicio de email esté correctamente conectado en EmailJS

### Error: "EmailJS no está configurado"

- Asegúrate de que las variables de entorno tengan el prefijo `REACT_APP_`
- Verifica que las variables estén configuradas en Vercel
- Realiza un redeploy después de agregar las variables

### Los emails no llegan

1. Revisa la carpeta de spam en tu email
2. Verifica que el "To Email" en la plantilla sea correcto
3. Revisa los logs en EmailJS para ver si hay errores
4. Asegúrate de que el servicio de email esté activo en EmailJS

## 📚 Recursos Adicionales

- [Documentación de EmailJS](https://www.emailjs.com/docs/)
- [Guía de Integración de EmailJS](https://www.emailjs.com/docs/examples/reactjs/)
- [Soporte de EmailJS](https://www.emailjs.com/support/)

## ✅ Checklist

- [ ] Cuenta de EmailJS creada
- [ ] Servicio de email agregado y conectado
- [ ] Plantilla de email creada con los campos correctos
- [ ] Service ID copiado
- [ ] Template ID copiado
- [ ] Public Key copiada
- [ ] Variables de entorno agregadas en Vercel
- [ ] Aplicación redeployada en Vercel
- [ ] Formulario probado y funcionando
- [ ] Emails recibidos correctamente

---

¡Listo! Tu formulario de contacto ahora está conectado con EmailJS y debería funcionar correctamente. 🎉

