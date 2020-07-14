import { Application, Router } from 'express';
import { Logger } from 'winston';
import { MongoRepository } from '../repositories/mongo.repository';
import ControllerFunction from "./route-controller";

// Proof-of-concept controller that serves an html page
export default ((app: Application, db: MongoRepository, logger: Logger) => {
    const router = Router();

    router.get("/", async (req, res) => {
        res.sendFile("html-poc.html",
            {
                root: "./src/public/views/"
            });
    });

    app.use("/html-poc", router);
}) as ControllerFunction;