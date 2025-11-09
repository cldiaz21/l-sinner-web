# 🌐 Configurar Dominio lsinn3r.cl en Vercel

## Paso 1: Agregar Dominio en Vercel

1. **Ve a tu proyecto en Vercel:**
   - https://vercel.com
   - Selecciona tu proyecto `l-sinner-web`

2. **Ve a Settings > Domains:**
   - En el menú lateral, haz clic en **"Settings"**
   - Luego haz clic en **"Domains"**

3. **Agrega el dominio:**
   - En el campo de texto, ingresa: `lsinn3r.cl`
   - Haz clic en **"Add"**

4. **Agrega el subdominio www (opcional pero recomendado):**
   - También agrega: `www.lsinn3r.cl`
   - Vercel te dará la opción de redirigir automáticamente

## Paso 2: Configurar DNS en tu Proveedor de Dominio

Vercel te dará las instrucciones de DNS. Generalmente necesitas:

### Opción A: Configurar Registros A (Recomendado)

Agrega estos registros en tu proveedor de DNS (donde compraste el dominio):

**Para el dominio principal (lsinn3r.cl):**
- Tipo: `A`
- Nombre: `@` o `lsinn3r.cl`
- Valor: `76.76.21.21` (IP de Vercel)

**Para el subdominio www:**
- Tipo: `CNAME`
- Nombre: `www`
- Valor: `cname.vercel-dns.com`

### Opción B: Usar Nameservers de Vercel (Más fácil)

1. Vercel te dará nameservers personalizados
2. Ve a tu proveedor de dominio
3. Cambia los nameservers a los que Vercel te proporcionó
4. Esto puede tardar hasta 48 horas en propagarse

## Paso 3: Configurar SSL/HTTPS

Vercel configurará automáticamente SSL/HTTPS para tu dominio. Solo necesitas esperar a que:
1. Los registros DNS se propaguen (puede tardar de minutos a 48 horas)
2. Vercel verifique el dominio
3. Vercel emita el certificado SSL

## Paso 4: Verificar el Dominio

1. Después de configurar DNS, espera unos minutos
2. Vercel verificará automáticamente el dominio
3. Verás un estado "Valid Configuration" cuando esté listo
4. El certificado SSL se emitirá automáticamente

## Paso 5: Redirección www (Opcional pero Recomendado)

Vercel te preguntará si quieres:
- **Redirect www to apex** (www.lsinn3r.cl → lsinn3r.cl)
- **Redirect apex to www** (lsinn3r.cl → www.lsinn3r.cl)
- **No redirect** (ambos funcionan independientemente)

**Recomendación:** Elige "Redirect www to apex" para que ambos apunten a `lsinn3r.cl`

## 📋 Checklist

- [ ] Dominio agregado en Vercel
- [ ] Registros DNS configurados en el proveedor de dominio
- [ ] DNS propagado (verificado con `nslookup lsinn3r.cl`)
- [ ] Dominio verificado en Vercel
- [ ] SSL/HTTPS activado automáticamente
- [ ] Sitio accesible en https://lsinn3r.cl

## 🔍 Verificar DNS

Puedes verificar que los DNS están configurados correctamente:

```bash
# En Windows PowerShell
nslookup lsinn3r.cl

# O usar herramientas online:
# - https://dnschecker.org
# - https://www.whatsmydns.net
```

## ⚠️ Troubleshooting

### El dominio no se verifica
- Espera hasta 48 horas para que los DNS se propaguen
- Verifica que los registros DNS estén correctos
- Asegúrate de que el dominio esté agregado correctamente en Vercel

### Error de SSL
- Espera a que Vercel emita el certificado (puede tardar hasta 24 horas)
- Verifica que el dominio esté correctamente configurado
- Asegúrate de que los DNS apunten correctamente a Vercel

### El sitio no carga
- Verifica que el deployment esté activo en Vercel
- Revisa los logs de Vercel para errores
- Asegúrate de que las variables de entorno estén configuradas

## 🎯 URLs Finales

Una vez configurado, tu sitio estará disponible en:
- **Principal:** https://lsinn3r.cl
- **www:** https://www.lsinn3r.cl (redirige a lsinn3r.cl)
- **Vercel:** https://l-sinner-web.vercel.app (sigue funcionando)

## 📝 Notas Importantes

- Los cambios de DNS pueden tardar hasta 48 horas en propagarse
- Vercel emite certificados SSL automáticamente (gratis)
- No necesitas configurar nada adicional en el código
- El dominio funcionará automáticamente con todos los deployments

