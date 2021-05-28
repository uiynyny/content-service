import Mongoose from 'mongoose';
import { MongoClient_Config } from "./ServiceConfig";
import { APILogger } from "../logger/APILogger";

export default class MongoDAO {
    private _db: Mongoose.Connection;
    private _logger: APILogger;
    
    constructor() {
        const db_name = process.env.DB_NAME;
        const uri = process.env.MONGO_URI;
        const conf = MongoClient_Config;
        Mongoose.connect(uri?.replace('\${db_name}', db_name as string)!, conf);
        this._logger = new APILogger();
        this._db = Mongoose.connection;

        this._db.once("open", async () => {
            this._logger.info('connected to database', null);
        });
    
        this._db.on("error", () => {
            console.error("Error connecting to database",null);
        });
    }
}