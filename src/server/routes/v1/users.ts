import express from "express";
import { V1 } from "types/api";

import { routingHandler } from "libs/handler";

import * as services from "services/v1/users";

import * as validators from "validators/v1/users";

/**
 * routing users
 * @returns Router
 */
export function routing(): express.Router {
	return express.Router()
		.post("/", routingHandler(post));
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
