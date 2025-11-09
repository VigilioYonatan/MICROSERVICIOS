import dotenv from "dotenv";
import * as joi from "joi";
dotenv.config({ path: ".env" });

interface EnvVars {
    PORT: number;
    PRODUCTS_MICROSERVICE_HOST: string;
    PRODUCTS_MICROSERVICE_PORT: number;
    DATABASE_URL: string;
}

const envsSchema = joi
    .object({
        PORT: joi.number().required(),
        PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
        PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
        DATABASE_URL: joi.string().required(),
    })
    .unknown(true);

const { error, value } = envsSchema.validate(process.env);
if (error) {
    throw new Error(`Config error var: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    PRODUCTS_MICROSERVICE_HOST: envVars.PRODUCTS_MICROSERVICE_HOST,
    PRODUCTS_MICROSERVICE_PORT: envVars.PRODUCTS_MICROSERVICE_PORT,
    DATABASE_URL: envVars.DATABASE_URL,
};
