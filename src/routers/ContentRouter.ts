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
        this._router.route('/')
            // GET /content
            .get((req: Request, res: Response) => {
                // add pagination support
                let skip = parseInt(req.query['skip'] as string);
                this._logger.info('list all contents', null);
                this._controller.getContents(skip).then(data => res.json(data));
            })
            // POST /content
            .post((req: Request, res: Response) => {
                this._logger.info('create content', req.body.content);
                this._controller.createContent(req.body.content).then(data => res.json(data));
            })
            // PUT /content
            .patch((req, res) => {
                this._logger.info('patch content', req.body.content);
                this._controller.updateContent(req.body.content).then(data => res.json(data));
            });

        // GET /content/user/username
        this._router.get('/user/:username', (req: Request, res: Response) => {
            // pagination support param: username query: skip= skip  &limit = limit
            let username = req.params.username;
            let skip = parseInt(req.query.skip as string);
            this._logger.info('get content for user', username);
            this._controller.getContentsByUsername(username, skip).then(data => res.json(data));
        })

        // GET /content/loc?lng=40&lat=40&radius=10
        this._router.get('/loc', (req: Request, res: Response) => {
            let lng = parseInt(req.query.lng as string);
            let lat = parseInt(req.query.lat as string);
            let radius = parseInt(req.query.radius as string);

            this._logger.info(`get content for map centered at LONG:${lng}, LATI:${lat}`, null);
            this._controller.getContentsByLocation(lng, lat, radius).then(data => res.json(data));
        })

        // DELETE /content/id
        this._router.delete('/:id', (req: Request, res: Response) => {
            this._logger.info('delete content id::', req.params.id);
            this._controller.deleteContent(req.params.id).then(data => res.json(data));
        })

    }
}