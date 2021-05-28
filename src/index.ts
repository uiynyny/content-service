import http from "http";
import App from "./app";
import { APILogger } from "./logger/APILogger";
require('dotenv').config({path: '.env'});

const logger = new APILogger();
const port = process.env.PORT || 5000;
const app = new App().express;

app.set('port', port);
const server = http.createServer(app);
server.listen(port);

server.on('listening', () => {
    const addr = server.address() || '';
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    logger.info(`Listening on ${bind}`,null);
})

module.exports = app;