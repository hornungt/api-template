import express from "express";
import { Logger } from "winston";
import cors from "cors";
import { MongoRepository } from "./repositories/mongo.repository";
import ControllerFunction from "./controllers/route-controller";

// creates RESTful API by dynamically setting up specified controllers
export async function initAPI(logger: Logger) {

    const app = express();
    const mongo = new MongoRepository(process.env.CONNECTION_STRING, process.env.DB, logger);

    app.use(cors());
    app.use(express.static('dist/public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // dynamically import controller code
    (await Promise.all<ControllerFunction>(
        [
            "html-poc",
            "crud"
        ]
            .map(uri => import(`./controllers/${uri}.controller`).then(imp => imp.default)))
    ).forEach((handler: ControllerFunction) => {
        // configure routes for each controller
        handler(app, mongo, logger);
    });

    app.listen(process.env.PORT);
}