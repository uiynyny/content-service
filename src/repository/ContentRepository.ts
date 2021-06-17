import { ContentModel } from "../model/ContentModel";
import MongoDAO from "../services/MongoDAO";
import { APILogger } from "../logger/APILogger";

const itemPerPage = 10;
export default class ContentRepository {
    private _db: MongoDAO;
    private _logger: APILogger;

    constructor() {
        this._logger = new APILogger();
        this._db = new MongoDAO();
    }

    async getContent(skip: number) {
        const contents = await ContentModel.find({}).skip(skip).limit(itemPerPage);
        this._logger.info('content::', contents);
        return contents;
    }

    async getContentsByUsername(username: string, skip: number) {
        const content = await ContentModel.find({ username: username }).skip(skip).limit(itemPerPage);
        this._logger.info(`${username} content::`, content);
        return content;
    }

    async getContentsByLocation(longitude: number, latitude: number, radius: number) {
        if (radius === 0) {
            radius = 0.001;
        }
        const content = await ContentModel.find({ geolocation: { $geoWithin: { $center: [[longitude, latitude], radius] } } });
        this._logger.info(`find records within ${radius} centered at ${longitude} and ${latitude}.`, content);
        return content;
    }

    async createContent(content: any) {
        let data = {};
        try {
            data = await ContentModel.create(content);
        } catch (err) {
            this._logger.error('error', err);
        }
        return data;
    }

    async updateContent(content: any) {
        let data = {}
        try {
            data = await ContentModel.updateOne(content);
        } catch (err) {
            this._logger.error('error', err);
        }
        return data;
    }

    async deleteContent(contentId: string) {
        let data = {}
        try {
            data = await ContentModel.deleteOne({ _id: contentId });
        } catch (err) {
            this._logger.error('error', err);
        }
        return data;
    }
}