# Invitación — Analia & Javier · Lorena & Claudio

Invitación digital de la boda doble. La estética es romántica natural: papel crema, verde salvia y detalles botánicos.

## Editar la invitación

Todo lo que cambia está en `lib/config.ts`:

- fecha y hora de la ceremonia (también mueve la cuenta regresiva)
- hora, lugar y dirección de la celebración
- alias y titular de Mercado Pago
- número de WhatsApp y mensaje de confirmación
- fotografías

Las fotos viven en `public/gallery`. Reemplazá cada archivo y actualizá su descripción en la configuración.

Cuando publiques el sitio, definí la dirección real:

```bash
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

Así la vista previa de WhatsApp apunta al enlace correcto.

## Desarrollo

```bash
npm install
npm run dev
```

Abrí `http://localhost:3000`.
