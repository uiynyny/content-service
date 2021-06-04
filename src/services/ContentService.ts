import { IContent } from "../model/ContentModel";
import ContentRepository from "../repository/ContentRepository";

const contentName = "content"
export default class ContentService {

    private _contentRepo: ContentRepository;
    constructor() {
        this._contentRepo = new ContentRepository();
    }

    async getContents(skip: number): Promise<IContent[]> {
        return this._contentRepo.getContent(skip);
    }

    async getContentsByUsername(username: string, skip: number): Promise<IContent[]> {
        return this._contentRepo.getContentsByUsername(username, skip);
    }
    
    async getContentsByLocation(longitude: number, latitude: number, radius: number){
        return this._contentRepo.getContentsByLocation(longitude, latitude, radius);
    }

    async createContent(content: IContent) {
        return this._contentRepo.createContent(content);
    }

    async updateContent(content: IContent) {
        return this._contentRepo.updateContent(content);
    }

    async deleteContent(contentId: string) {
        return this._contentRepo.deleteContent(contentId);
    }
}