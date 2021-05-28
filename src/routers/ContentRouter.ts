import { NextFunction, Request, Response, Router } from "express";
import { ObjectId } from "mongoose";
import ContentController from "../controllers/ContentController";
import { APILogger } from "../logger/APILogger";

export default class ContentRouter {
    private _router;
    private _controller;
    private _logger;

    get router() {
        return this._router;
    }

    constructor() {
        this._controller = new ContentController();
        this._router = Router();
        this._configure();
        this._logger = new APILogger();
    }

    private _configure() {
        this._router.get('/', (req: Request, res: Response) => {
            this._logger.info('list all contents', null);
            this._controller.getContents().then(data => res.json(data));
        });
        this._router.get('/:username', (req: Request, res: Response) => {
            this._logger.info('get content for user', req.params.username);
            this._controller.getContentsByUsername(req.params.username).then(data => res.json(data));
        })
        this._router.post('/', (req: Request, res: Response) => {
            this._logger.info('create content', req.body.content);
            this._controller.createContent(req.body.content).then(data => res.json(data));
        })
        this._router.delete('/:id', (req: Request, res: Response) => {
            this._logger.info('delete content id::', req.params.id);
            this._controller.deleteContent(req.params.id).then(data => res.json(data));
        })
        this._router.patch('/', (req, res) => {
            this._logger.info('patch content', req.body.content);
            this._controller.updateContent(req.body.content).then(data => res.json(data));
        })
    }
}