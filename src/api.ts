import express from "express";
import { Logger } from "winston";
import ControllerFunction from "./controllers/route-controller";
import { PORT, CONNECTION_STRING, CONNECTION_OPTIONS, DB } from "./config";
import { MongoRepository } from "./repositories/mongo.repository";

export async function initAPI(logger: Logger) {

    const app = express();
    const mongo = new MongoRepository(CONNECTION_STRING, DB, CONNECTION_OPTIONS, logger);

    app.use(express.static('dist/public'));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // dynamically import controller code
    (await Promise.all<ControllerFunction>(
        [
            "queue",
            "html-poc",
            "crud"
        ]
            .map(uri => import(`./controllers/${uri}.controller`).then(imp => imp.default)))
    ).forEach((handler: ControllerFunction) => {
        // configure routes for each controller
        handler(app, mongo, logger);
    });

    app.listen(PORT);
}