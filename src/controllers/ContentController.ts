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

    async getContents(skip: number): Promise<IContent[]> {
        return this._contentService.getContents(skip);
    }

    async getContentsByUsername(username: string, skip: number) {
        return this._contentService.getContentsByUsername(username, skip);
    }

    async getContentsByLocation(longitude: number, latitude: number, radius: number){
        return this._contentService.getContentsByLocation(longitude,latitude,radius);
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