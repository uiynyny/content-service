import { NextFunction, Request, Response, Router } from "express";
import ContentController from "../controllers/ContentController";

export default class ContentRouter {
    private _router;
    private _controller;

    get router() {
        return this._router;
    }

    constructor() {
        this._controller = new ContentController();
        this._router = Router();
        this._configure();
    }

    private _configure() {
        this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json(this._controller.defaultMethod());
        });
        this._router.post('/', (req: Request, res: Response, next: NextFunction) => {
            console.log(req.body);
        })
    }
}