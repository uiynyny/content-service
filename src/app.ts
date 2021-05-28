import express from "express";
import swaggerUi from "swagger-ui-express";

import MasterRouter from "./routers/masterRouter";
import ContentController from "./controllers/ContentController";
import fs from 'fs';

export default class App {
    public express: express.Application;
    public contentController: ContentController;

    private swaggerData: any = fs.readFileSync(__dirname + '/swagger/swagger.json', 'utf8');
    private customCss: any = fs.readFileSync(__dirname + '/swagger/swagger.css', 'utf8');
    private swaggerDocument = JSON.parse(this.swaggerData);

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        if (process.env.NODE_ENV !== 'production') {
            const morgan = require('morgan');
            this.express.use(morgan('tiny'))
        }
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
    }

    private routes(): void {
        const default_route = '/naka/v0';
        this.express.use(default_route, new MasterRouter().router);
        this.express.use('/api/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument, {}, {}, this.customCss));
        this.express.use('*', (req, res) => {
            res.status(404).json({ message: 'source not found' });
        })
    }
}