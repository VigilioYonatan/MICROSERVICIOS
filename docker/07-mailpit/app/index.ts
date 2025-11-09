import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "localhost", // o 'mailpit' si usas docker-compose en la misma red
    port: 1025,
    secure: false,
});

await transporter.sendMail({
    from: '"Vigilio Services" <no-reply@vigilio-services.com>',
    to: "usuario@ejemplo.com",
    subject: "Correo de prueba",
    text: "Hola Yonatan!",
});
