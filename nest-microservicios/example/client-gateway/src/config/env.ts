import dotenv from "dotenv";
import * as joi from "joi";
dotenv.config({ path: ".env" });

interface EnvVars {
    PORT: number;
    // PRODUCTS_MICROSERVICE_HOST: string;
    // PRODUCTS_MICROSERVICE_PORT: number;
    // ORDERS_MICROSERVICE_HOST: string;
    // ORDERS_MICROSERVICE_PORT: number;
    NATS_SERVERS: string;
}

const envsSchema = joi
    .object({
        PORT: joi.number().required(),
        // PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
        // PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
        // ORDERS_MICROSERVICE_HOST: joi.string().required(),
        // ORDERS_MICROSERVICE_PORT: joi.number().required(),
        NATS_SERVERS: joi.string().required(),
    })
    .unknown(true);

const { error, value } = envsSchema.validate(process.env);
if (error) {
    throw new Error(`Config error var: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    // PRODUCTS_MICROSERVICE_HOST: envVars.PRODUCTS_MICROSERVICE_HOST,
    // PRODUCTS_MICROSERVICE_PORT: envVars.PRODUCTS_MICROSERVICE_PORT,
    // ORDERS_MICROSERVICE_HOST: envVars.ORDERS_MICROSERVICE_HOST,
    // ORDERS_MICROSERVICE_PORT: envVars.ORDERS_MICROSERVICE_PORT,
    natsServers: envVars.NATS_SERVERS,
};
