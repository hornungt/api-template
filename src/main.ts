import winston from "winston";
import { initAPI, initAPISql } from "./api";
import { config } from "dotenv";

// config env constants
config();

// create winston logger
const logger = module.exports = winston.createLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
    )
});

// start api
initAPI(logger);
initAPISql(logger);