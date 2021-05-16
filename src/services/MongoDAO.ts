import { Collection, Db, MongoClient } from "mongodb";
import { MongoClient_Config } from "./ServiceConfig";

const uri = process.env.MONGO_URI;
const db_name = process.env.MONGO_DB_NAME;
const conf = MongoClient_Config;

export default class MongoDAO {
    private _client;
    private _db;
    private _Content;

    constructor() {
        this._client = new MongoClient(uri!, conf);
    }

    public async init() {
        await this._client.connect();
        console.log('connected');
        let db_name = process.env.MONGO_DB_NAME;
        this._db = this._client.db(db_name);
        this._Content = new Content(this._db);
    }
}