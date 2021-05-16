import dotenv from "dotenv";
import express from "express";

import MongoDAO from "./services/MongoDAO";
import MasterRouter from "./routers/masterRouter";

dotenv.config({
    path: '.env'
});


class Server {
    public app = express();
    public router = new MasterRouter().router;
    public db = new MongoDAO();
    public async start() {
        await this.db.init();
    }
}
const server = new Server();
server.start();

if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    server.app.use(morgan('tiny'))
}
const default_route = '/naka/v0';
server.app.use(default_route, server.router);

((port = process.env.APP_PORT || 5000) => {
    server.app.listen(port, () => console.log(`> http://localhost:${port}`));
})();