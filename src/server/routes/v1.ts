import express from "express";

import { routingHandler } from "libs/handler";

import {routing as routingUsers} from "./v1/users";

import * as services from "services/v1";
import { V1 } from "types/api";
import * as validators from "validators/v1";

/**
 * routing function
 * @returns Router
 */
export function routing(): express.Router {
	return express.Router()
		.use("/users", routingUsers())
		.post("/login", routingHandler(postLogin));
}

/**
 * POST /v1/login
 * login
 * @param req request
 * @param res response
 * @returns void
 */
async function postLogin(req: express.Request, res: express.Response): Promise<void> {
	const reqBody: V1.Login.RequestBody = validators.BodyPostLogin(req);
	const resBody: V1.Login.ResponseBody = await services.postLogin(req, reqBody.email, reqBody.password);
	res
		.status(201)
		.send(resBody);
}
