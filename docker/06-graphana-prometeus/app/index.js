import express from "express";
import client from "prom-client";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const app = express();
const SERVICE_NAME = process.env.SERVICE_NAME || "restaurante";

// Registro de métricas
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Contador de requests HTTP
const httpRequestCount = new client.Counter({
    name: "http_requests_total",
    help: "Número total de peticiones HTTP",
    labelNames: ["method", "route", "status", "service"],
});

register.registerMetric(httpRequestCount);

// Middleware de conteo
app.use((req, res, next) => {
    res.on("finish", () => {
        httpRequestCount.inc({
            method: req.method,
            route: req.path,
            status: res.statusCode,
            service: SERVICE_NAME,
        });
    });
    next();
});

// Endpoint principal
app.get("/", (_, res) => {
    res.send(`🚀 ${SERVICE_NAME} funcionando correctamente`);
});

// Endpoint de métricas
app.get("/metrics", async (_, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
});

app.listen(process.env.PORT, () =>
    console.log(`✅ ${SERVICE_NAME} en http://localhost:${process.env.PORT}`)
);
