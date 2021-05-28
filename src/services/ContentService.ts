import { IContent } from "../model/ContentModel";
import ContentRepository from "../repository/ContentRepository";

const contentName = "content"
export default class ContentService {

    private _contentRepo: ContentRepository;
    constructor() {
        this._contentRepo = new ContentRepository();
    }

    async getContents():Promise<IContent[]> {
        return this._contentRepo.getContent();
    }

    async getContentsByUsername(username:string): Promise<IContent[]>{
        return this._contentRepo.getContentsByUsername(username);
    }

    async createContent(content: IContent) {
        return this._contentRepo.createContent(content);
    }

    async updateContent(content: IContent) {
        return this._contentRepo.updateContent(content);
    }

    async deleteContent(contentId:string) {
        return this._contentRepo.deleteContent(contentId);
    }
}