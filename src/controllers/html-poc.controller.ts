import { Application, Router } from 'express';
import { Logger } from 'winston';
import ControllerFunction from "./route-controller";
import { MongoRepository } from '../repositories/mongo.repository';

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