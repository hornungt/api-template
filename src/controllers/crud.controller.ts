import { Application, Router } from "express";
import { Logger } from "winston";
import { ObjectID, DeleteWriteOpResultObject } from "mongodb";
import { MongoRepository } from "../repositories/mongo.repository";
import ControllerFunction from "./route-controller";
import { StringDecoder } from "string_decoder";

// exposes Create, Read, Update, and Delete functionality for a mongodb Atlas repository
export default ((app: Application, db: MongoRepository, logger: Logger) => {
    const router = Router();

    // create
    router.post("/", async (req, res) => {
        const op = await db.insert(process.env.DEMO_COLLECTION, req.body);
        res.send(op.result);
    });

    // read
    router.get("/", async (req, res) => {
        let ret: any[];
        await db.find(process.env.DEMO_COLLECTION, { "val": { $exists: true } })
            .then(async (val) => ret = await val.toArray())
            .catch((err) => logger.error(err));
        res.send(ret);
    });

    // update
    router.put("/", async (req, res) => {
        const op = await db.update(process.env.DEMO_COLLECTION,
            { "_id": new ObjectID(req.body._id) }, { $set: { "val": req.body.val } });
        res.send(op.result);
    });

    // delete
    router.delete("/", async (req, res) => {
        // todo: fix this endpoint
        const ids: ObjectID[] = Array.isArray(req.body.ids) ?
            req.body.ids.map((id: string) => new ObjectID(id)) : Array.from<ObjectID>(req.body.ids);

        let ret: DeleteWriteOpResultObject;
        await db.delete(process.env.DEMO_COLLECTION, { _id : { $in: ids }})
            .then((opResult) => ret = opResult)
            .catch((err) => logger.error(err));
        res.send(ret.result);
    });

    app.use("/crud", router);

}) as ControllerFunction;