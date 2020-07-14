import { Application, Router } from "express";
import { Logger } from "winston";
import { MongoRepository } from "../repositories/mongo.repository";
import ControllerFunction from "./route-controller";

export default ((app: Application, db: MongoRepository, logger: Logger) => {
    const router = Router();

    router.post("/", async (req, res) => {
        const op = await db.insert(process.env.DEMO_COLLECTION, req.body);
        res.send(op.result);
    });

    router.get("/", async (req, res) => {
        let ret: any[];
        await db.find(process.env.DEMO_COLLECTION, { "val": { $exists: true } })
            .then(async (val) => ret = await val.toArray())
            .catch((err) => logger.error(err));
        res.send(ret);
    });

    app.use("/crud", router);

}) as ControllerFunction;