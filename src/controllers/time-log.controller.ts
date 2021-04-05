import { Router, Application } from "express";
import { Logger } from "winston";
import { ConnectionPool, config } from "mssql";

export default (async (app: Application, logger: Logger) => {
    const router = Router();
    const connConfig: config = {
        user: 'dbo',
        password: 'rummageembedrelapse',
        server: 'DESKTOP-LSL2K71\\SQLEXPRESS',
        database: 'master',
        options: {
            enableArithAbort: true
        }
    };
    let sql: ConnectionPool;
    try {
        logger.info("trying to connect to db");
        sql = await new ConnectionPool(connConfig).connect();
        logger.info("connected to sql db");
    } catch {
        throw new Error("Unable to connect to SQL database");
    }

    router.get("/", async (req, res) => {
        let ret: any;
        sql.query("SELECT TOP (1) FROM PoCLogs ORDER BY RequestTime Desc")
            .then((val) => ret = val.output)
            .catch(err => logger.error(err));
        res.send(ret);
    });

    app.use("logs", router);

});