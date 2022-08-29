import express from "express";
import * as UserUsecase from "features/users/UserUsecase";
import { V1 } from "types/api";

/**
 * POST /v1/login
 * login
 * @param req request
 * @param email email
 * @param password password
 * @returns void
 */
export async function postLogin(req: express.Request, email: string, password: string): Promise<V1.Login.ResponseBody> {
	return await UserUsecase.login(req, email, password);
}
