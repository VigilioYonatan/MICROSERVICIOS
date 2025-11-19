import express from "express";
import { Client } from "minio";
import path from "node:path";
const app = express();
const BUCKET_NAME = "mybucket";

app.get("/", (_, res) => {
    return res.send(`<html>
        <head>
            <title>hola</title>
        </head>
        <body>
            <h1>hola</h1>
            <img width="100" src='/file/imagen.jpg'/>
        </body>
        </html>`);
});
app.get("/upload", async () => {
    await initMinio();
});

app.listen(4000, () => {
    console.log(`Corriendo servidor en el puerto ${4000}`);
});
app.get("/file/:name", async (req, res) => {
    try {
        const stat = await minioClient.statObject(BUCKET_NAME, req.params.name);
        res.set("Content-Type", stat.metaData["content-type"]);
        const stream = await minioClient.getObject(
            BUCKET_NAME,
            req.params.name
        );
        stream.pipe(res);
    } catch (e) {
        res.status(404).send("Archivo no encontrado");
    }
});
// Configuración del cliente MinIO
const minioClient = new Client({
    endPoint: "localhost", // o el nombre del servicio si está en Docker, ej. "minio"
    port: 9000,
    useSSL: false,
    accessKey: "vigilio",
    secretKey: "dokixd123",
});

const FILE_PATH = "image.jpg";
const OBJECT_NAME = "private2/imagen.jpg"; // nombre que tendrá dentro del bucket

async function initMinio() {
    // Verificar si existe el bucket
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    if (!exists) {
        console.log(`🪣 Creando bucket: ${BUCKET_NAME}`);
        await minioClient.makeBucket(BUCKET_NAME, "us-east-1");
    } else {
        console.log(`✅ El bucket "${BUCKET_NAME}" ya existe`);
    }

    // Subir un archivo de prueba
    // const meta = { 'Content-Type': req.file.mimetype };

    // await minioClient.putObject(
    //     BUCKET_NAME,
    //     "example2.txt",
    //     Buffer.from("Hola desde MinIO SDK!")
    // );
    console.log(`☁️  Subiendo ${FILE_PATH} → ${BUCKET_NAME}/${OBJECT_NAME}`);
    await minioClient.fPutObject(
        BUCKET_NAME,
        OBJECT_NAME,
        path.resolve(FILE_PATH),
        {
            "Content-Type": "image/jpg", // ajusta si tu imagen es png, webp, etc.
            "X-Amz-Acl": "private",
        }
    );
    console.log(`✅ Objeto subido: ${OBJECT_NAME}`);

    // const stream = minioClient.listObjects(BUCKET_NAME, "", true);
    // console.log("📄 Objetos en el bucket:");
    // stream.on("data", (obj) => console.log("   -", obj.name));
    // stream.on("end", () => console.log("✅ Listado finalizado"));
    // stream.on("error", (e) => console.error("❌ Listado error:", e));
}
