import { Application, Router } from 'express';
import { Logger } from 'winston';
import { MongoRepository } from '../repositories/mongo.repository';

type ControllerFunction = (app: Application, db: MongoRepository, logger: Logger) => void;
export default ControllerFunction;