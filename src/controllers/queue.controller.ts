import { Application, Router } from 'express';
import { MongoRepository } from '../repositories/mongo.repository';
import { Logger } from 'winston';
import ControllerFunction from './route-controller';
import { Queue } from '../queue';

export default ((app: Application, db: MongoRepository, logger: Logger) => {
    const queueRouter = Router();
    const queue = new Queue();

    queueRouter.post("/", (req, res) => {
        queue.enqueue(req.body.val);
        res.status(202).json(req.body.val);
    });

    queueRouter.get("/", (req, res) => {
        const val = queue.dequeue();
        val ? res.send(val) : res.status(204).send();
    });

    app.use("/queue", queueRouter);
}) as ControllerFunction;