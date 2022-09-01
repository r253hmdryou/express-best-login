import express from "express";
import { AppError } from "libs/error/AppError";
import { errorMessages } from "libs/error/messages";
import { routing as routingV1 } from "./routes/v1";

/**
 * routing function
 * @returns Router
 */
export function routing(): express.Router {
	return express.Router()
		.use(checkCSRF)
		.use("/v1", routingV1())
		.use(notFound)
		.use(AppErrorHandler)
		.use(errorHandler);
}

/**
 * check CSRF
 * @param req request
 * @param _res response
 * @param next next
 * @throws if required header is not set
 * @returns void
 */
function checkCSRF(req: express.Request, _res: express.Response, next: express.NextFunction): void {
	if(req.header("X-Requested-With") === undefined) {
		AppError.raise(errorMessages.api.headerRequired);
	}
	next();
}

/**
 * Request Not Found
 * @param _req request
 * @param _res response
 * @param _next next
 * @returns void
 */
function notFound(_req: express.Request, _res: express.Response, _next: express.NextFunction): void {
	AppError.raise(errorMessages.general.notFound);
}

/**
 * AppError Handler
 * @param err error
 * @param _req request
 * @param res response
 * @param next next
 * @returns void
 */
function AppErrorHandler(err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction): void {
	if (err instanceof AppError) {
		res
			.status(err.getStatus())
			.json(err.getApiResponseBody());
	} else {
		next(err);
	}
}

/**
 * Error Handler
 * @param _error error
 * @param _req request
 * @param res response
 * @param _next next
 * @returns void
 */
export function errorHandler(_error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction): void {
	console.error(_error);
	res
		.status(errorMessages.general.internalServerError.status)
		.json({
			code: errorMessages.general.internalServerError.code,
			message: errorMessages.general.internalServerError.message,
		});
}
