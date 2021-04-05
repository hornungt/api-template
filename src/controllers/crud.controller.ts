import { Application, Router } from "express";
import { Logger } from "winston";
import { MongoRepository } from "../repositories/mongo.repository";
import { SqlRepository } from "../repositories/sql.repository";
import ControllerFunction from "./route-controller";
import { DemoManager } from "../managers/demo.manager";

// exposes Create, Read, Update, and Delete functionality for a mongodb Atlas repository
export default ((app: Application, db: MongoRepository, logger: Logger) => {
    const router = Router();
    const manager = new DemoManager(db, logger);

    // create
    router.post("/", async (req, res) => {
        const ret = await manager.createOne(req.body);
        res.send(ret);
    });

    // read
    router.get("/", async (req, res) => {
        const ret = await manager.getAll();
        res.send(ret);
    });

    // update
    router.put("/", async (req, res) => {
        res.send(await manager.updateByID(req.body.id, req.body.val));
    });

    // delete
    router.delete("/", async (req, res) => {
        res.send(await manager.deleteByID(req.body.id));
    });

    app.use("/crud", router);

}) as ControllerFunction;