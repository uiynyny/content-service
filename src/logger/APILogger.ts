import pino from "pino";

const logger: pino.Logger = pino();

export class APILogger {
    info(message: string, data: any) {
        logger.info(`${message} ${data ? JSON.stringify(data) : ''}`);
    }
    error(message: string, data: any) {
        logger.error(`${message} ${data ? JSON.stringify(data) : ''}`);
    }
}