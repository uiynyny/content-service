import Mongoose, { ObjectId } from "mongoose";
import { ContentModel, IContent } from "../model/ContentModel";
import MongoDAO from "../services/MongoDAO";
import { APILogger } from "../logger/APILogger";

export default class ContentRepository {
    private _db: MongoDAO;
    private _logger: APILogger;

    constructor() {
        this._logger = new APILogger();
        this._db = new MongoDAO();
    }

    async getContent() {
        const contents = await ContentModel.find({})
        this._logger.info('content::', contents);
        return contents;
    }

    async getContentsByUsername(username: string) {
        const content = await ContentModel.find({ username: username })
        this._logger.info(`${username} content::`, content)
        return content
    }

    async createContent(content: any) {
        let data = {};
        try {
            data = await ContentModel.create(content);
        } catch (err) {
            console.log('error', err);
        }
        return data;
    }

    async updateContent(content: any) {
        let data = {}
        try {
            data = await ContentModel.updateOne(content);
        } catch (err) {
            console.log('error', err);
        }
        return data;
    }

    async deleteContent(contentId: string) {
        let data = {}
        try {
            data = await ContentModel.deleteOne({ _id: contentId });
        } catch (err) {
            console.log('error', err);
        }
        return data;
    }
}