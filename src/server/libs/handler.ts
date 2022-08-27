import express from "express";

type AsyncRoutingHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;

/**
 * routing handler
 * @param handler routing handler
 * @returns routing handler
 */
export function routingHandler(handler: AsyncRoutingHandler): express.RequestHandler {
	return (req, res, next) => {
		handler(req, res, next).catch((error) => {
			next(error);
		});
	};
}
