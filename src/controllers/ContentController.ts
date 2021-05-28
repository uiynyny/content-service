import { NextFunction } from "express";
import { ObjectId } from "mongoose";
import { IContent } from "../model/ContentModel";
import ContentService from "../services/ContentService";

export default class ContentController {
    private _contentService: ContentService;
    constructor() {
        this._contentService = new ContentService();
    }

    defaultMethod() {
        return { text: `You've reached the ${this.constructor.name} default method` };
    }

    async getContents(): Promise<IContent[]> {
        return this._contentService.getContents();
    }

    async getContentsByUsername(username: string) {
        return this._contentService.getContentsByUsername(username);
    }

    async createContent(content: IContent) {
        return this._contentService.createContent(content);
    }

    async updateContent(content: IContent) {
        return this._contentService.updateContent(content);
    }

    async deleteContent(contentId: string) {
        return this._contentService.deleteContent(contentId);
    }
}