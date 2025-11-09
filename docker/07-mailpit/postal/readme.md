# Pasos

🖥️ 3️⃣ Configurar Postal

Una vez que el contenedor esté corriendo:

Abre tu navegador y entra a
👉 http://mail.vigilio-services.com
(asegúrate que tu dominio apunta al VPS)

Crea tu cuenta admin.

En el dashboard, crea una “Organization” y luego un “Mail Server”.

🧾 4️⃣ Configurar DNS del dominio

Para que Postal pueda enviar correos sin ir a spam, necesitas añadir en tu DNS:

Tipo Nombre Valor Descripción
A mail IP de tu VPS Servidor de correo
MX @ mail.vigilio-services.com Servidor que recibe correos
TXT @ v=spf1 include:spf.postal.yourdomain.com ~all Anti-spam
TXT postal.\_domainkey (clave DKIM generada por Postal) Firma digital de correo

Postal te mostrará estos valores en su panel (en la sección DNS Records del mail server).

🧰 5️⃣ Crear correos corporativos

Desde el panel:

Entra en tu Mail Server → “Domains”.

Añade tu dominio (vigilio-services.com).

Crea usuarios:

contacto@vigilio-services.com

soporte@vigilio-services.com

ventas@vigilio-services.com

Cada uno tendrá su SMTP user y password, que podrás usar para enviar correos.

´´´ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
host: 'mail.vigilio-services.com',
port: 587,
secure: false,
auth: {
user: 'contacto@vigilio-services.com',
pass: 'contraseña_generada_en_postal',
},
});

await transporter.sendMail({
from: '"Vigilio Services" <contacto@vigilio-services.com>',
to: 'cliente@ejemplo.com',
subject: 'Bienvenido a Vigilio Services',
text: 'Tu cuenta fue creada correctamente.',
});
´´´
