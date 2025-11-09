import { Client } from "minio";

// Configuración del cliente MinIO
const minioClient = new Client({
    endPoint: "localhost", // o el nombre del servicio si está en Docker, ej. "minio"
    port: 9000,
    useSSL: false,
    accessKey: "vigilio",
    secretKey: "dokixd123",
});

const BUCKET_NAME = "mybucket";

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
    await minioClient.putObject(
        BUCKET_NAME,
        "example.txt",
        Buffer.from("Hola desde MinIO SDK!")
    );
    console.log("✅ Archivo subido correctamente");
}

initMinio().catch(console.error);
