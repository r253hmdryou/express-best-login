import express from "express";
import * as SessionRepository from "./SessionRepository";

declare module "express-session" {
	interface SessionData {
		eblaSessionId: string;
	}
}

/**
 * create session record
 * @param req request
 * @param userId userId
 * @returns void
 */
export async function create(req: express.Request, userId: number): Promise<void> {
	await SessionRepository.create(req.sessionID, userId, req.session.cookie);
}

/**
 * remove session record
 * @param req request
 * @returns void
 */
export async function remove(req: express.Request): Promise<void> {
	await SessionRepository.remove(req.sessionID);
}
