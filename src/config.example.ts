import { MongoClientOptions } from "mongodb";

export const PORT = 8080;
export const CONNECTION_STRING = "YOUR CONNECTION STRING HERE";
export const CONNECTION_OPTIONS: MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true  };
export const DB = "YOUR DB NAME HERE";
export const DEMO_COLLECTION = "YOUR COLLECTION NAME HERE";