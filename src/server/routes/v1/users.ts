import express from "express";
import { V1 } from "types/api";

import { routingHandler } from "libs/handler";

import * as services from "services/v1/users";

import * as validators from "validators/v1/users";
import { paramUserId } from "validators/common";
import { findAuthorizedUser } from "features/users/UserUsecase";

/**
 * routing users
 * @returns Router
 */
export function routing(): express.Router {
	return express.Router()
		.post("/", routingHandler(post))
		.get("/me", routingHandler(getMe))
		.post("/:userId", routingHandler(postUserId));
}

/**
 * POST /v1/users
 * confirm email to create user
 * @param req request
 * @param res response
 * @returns void
 */
async function post(req: express.Request, res: express.Response): Promise<void> {
	const reqBody: V1.ConfirmEmailToCreateUser.RequestBody = validators.BodyPost(req);
	await services.post(reqBody.email);

	res
		.status(201)
		.send();
}

/**
 * GET /v1/users/me
 * get my user
 * @param req request
 * @param res response
 * @returns void
 */
async function getMe(req: express.Request, res: express.Response): Promise<void> {
	const user = await findAuthorizedUser(req);
	const resBody: V1.GetMyUser.ResponseBody = services.getMe(user);

	res
		.status(200)
		.send(resBody);
}

/**
 * POST /v1/users/:userId
 * signup user
 * @param req request
 * @param res response
 * @returns void
 */
async function postUserId(req: express.Request, res: express.Response): Promise<void> {
	const reqParam: V1.SignUp.RequestParams = paramUserId(req);
	const reqBody: V1.SignUp.RequestBody = validators.BodyPostUserId(req);
	const resBody: V1.SignUp.ResponseBody = await services.postUserId(reqParam.userId, reqBody.password);

	res
		.status(201)
		.send(resBody);
}
