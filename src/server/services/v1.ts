import express from "express";
import * as UserUsecase from "features/users/UserUsecase";
import { Login } from "types/api";

/**
 * POST /v1/login
 * login
 * @param req request
 * @param email email
 * @param password password
 * @returns void
 */
export async function postLogin(req: express.Request, email: string, password: string): Promise<Login.Login.ResponseBody> {
	const user = await UserUsecase.login(req, email, password);
	return UserUsecase.toResponse(user);
}

/**
 * POST /v1/logout
 * @param req request
 * @returns void
 */
export async function postLogout(req: express.Request): Promise<void> {
	await UserUsecase.logout(req);
}
