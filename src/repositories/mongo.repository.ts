import { MongoClient, FilterQuery, UpdateQuery, Db } from "mongodb";
import { Logger } from "winston";

// cleanly packages mongodb interactions
export class MongoRepository {

    private dbName: string;
    private client: MongoClient;
    private db: Db;
    private logger: Logger;

    constructor(connString: string, dbName: string, logger: Logger) {
        this.dbName = dbName;
        this.logger = logger;
        // connect to db when repository obj created
        new MongoClient(connString, { useNewUrlParser: true, useUnifiedTopology: true  }).connect()
            .then((client) => this.db = client.db(dbName))
            .catch((err) => logger.error(err));
    }

    async find(collection: string, filter: FilterQuery<any>) {
        try {
            return this.db.collection(collection).find(filter);
        } catch {
            this.logger.error('failed in MongoRepository#find');
        }
    }

    async insert(collection: string, data: any) {
        const col = this.db.collection(collection);
        if (Array.isArray(data)) {
            return await col.insertMany(data);
        } else {
            return await col.insertOne(data);
        }
    }

    async update(collection: string, filter: FilterQuery<any>, update: UpdateQuery<any>) {
        return await this.db.collection(collection).updateMany(filter, update);
    }
}