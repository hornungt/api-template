import { Logger } from "winston";
import { MongoRepository } from "../repositories/mongo.repository";
import { ObjectID, DeleteWriteOpResultObject } from "mongodb";

// manager layer hides direct repository interaction from the controller layer
export class DemoManager {
    private repo: MongoRepository;
    private logger: Logger;

    constructor(repo: MongoRepository, logger: Logger) {
        this.repo = repo;
        this.logger = logger;
    }

    async getAll(): Promise<any[]> {
        let ret: any[];
        await this.repo.read(process.env.DEMO_COLLECTION, { "val": { $exists: true } })
            .then(async (val) => ret = await val.toArray())
            .catch((err) => this.logger.error(err));
        return ret;
    }

    async createOne(obj: any) {
        return (await this.repo.create(process.env.DEMO_COLLECTION, obj)).result;
    }

    async updateByID(id: string, newVal: any) {
        return (await this.repo.update(process.env.DEMO_COLLECTION,
            { "_id": new ObjectID(id) }, { $set: { "val": newVal } })).result;
    }

    async deleteByID(id: string) {
        let ret: DeleteWriteOpResultObject;
        await this.repo.delete(process.env.DEMO_COLLECTION, { _id : { $eq: new ObjectID(id) }})
            .then((opResult) => ret = opResult)
            .catch((err) => this.logger.error(err));

        return ret.result;
    }

}