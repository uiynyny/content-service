import { Router } from "express";
import ContentRouter from "./ContentRouter";

export default class MasterRouter {
    private _router;
    private _contentRouter;

    constructor() {
        this._router = Router();
        this._contentRouter = new ContentRouter().router
        this._configure();
    }

    get router(){
        return this._router;
    }

    private _configure() {
        this._router.use('/content', this._contentRouter);
    }
}