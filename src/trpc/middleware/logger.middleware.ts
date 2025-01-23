import { Injectable, Logger } from "@nestjs/common";
import { MiddlewareOptions, MiddlewareResponse, TRPCMiddleware } from "nestjs-trpc";
import { IAppContext } from "../context/context.interface";

@Injectable()
export class LoggerMiddleware implements TRPCMiddleware {
    private readonly logger = new Logger(LoggerMiddleware.name)

    async use(opts: MiddlewareOptions<IAppContext>): Promise<MiddlewareResponse> {
        const start = Date.now()
        const { next, path, type, input } = opts
        const result = await next();

        const { req, res } = opts.ctx


        const meta = {
            path,
            type,
            durationMs: Date.now() - start,
            method: req.method,
            statusCode: res.status,
            ip: req.ip,
            headers: req.headers
        }

        result.ok
            ? this.logger.log("Success", meta)
            : this.logger.log("Success", meta)

        return result
    }

}