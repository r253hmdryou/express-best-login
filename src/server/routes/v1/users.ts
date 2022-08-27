import express from "express";
import { routingHandler } from "libs/handler";

import * as services from "services/v1/users";
import * as validator from "validators/v1/users";
import { V1 } from "types/api";

/**
 * routing function
 * @returns Router
 */
export function routing(): express.Router {
	return express.Router()
		.get("/", routingHandler(get))
		.post("/", routingHandler(post))
		.get("/:userId", routingHandler(getUserId))
		.put("/:userId", routingHandler(putUserId));
}

/**
 * GET /v1/users
 * get users
 * @param _req request
 * @param res response
 * @returns void
 */
async function get(_req: express.Request, res: express.Response): Promise<void> {
	const resBody: V1.GetUsers.ResponseBody = await services.get();
	res.status(200).send(resBody);
}

/**
 * POST /v1/users
 * create a user
 * @param req request
 * @param res response
 * @param _next next
 * @returns void
 */
async function post(req: express.Request, res: express.Response, _next: express.NextFunction): Promise<void> {
	const reqBody: V1.CreateUser.RequestBody = validator.bodyPostUsers(req);
	const resBody: V1.CreateUser.ResponseBody = await services.post(reqBody);
	res.status(201).send(resBody);
}

/**
 * GET /v1/users/:userId
 * get user
 * @param req request
 * @param res response
 * @returns void
 */
async function getUserId(req: express.Request, res: express.Response): Promise<void> {
	console.log(req.params);
	const reqParams: V1.GetUser.RequestParams = validator.paramsGetUserId(req);
	const resBody: V1.GetUser.ResponseBody = await services.getUserId(reqParams);
	res.status(200).send(resBody);
}

/**
 * PUT /v1/users/:userId
 * update user
 * @param req request
 * @param res response
 * @returns void
 */
async function putUserId(req: express.Request, res: express.Response): Promise<void> {
	const reqParams: V1.UpdateUser.RequestParams = validator.paramsPutUserId(req);
	const reqBody: V1.UpdateUser.RequestBody = validator.bodyPutUserId(req);
	const resBody = await services.putUserId(reqParams, reqBody);
	res.status(200).send(resBody);
}
