import express from "express";
import { AppError } from "libs/error/AppError";
import { errorMessages } from "libs/error/messages";

import { UserEntity } from "./UserEntity";
import * as UserRepository from "./UserRepository";

import * as EmailUsecase from "features/emails/EmailUsecase";
import * as SessionUsecase from "features/serssions/SessionUsecase";

import { UserForMe } from "types/api";

/**
 * find user by uuid
 * @param uuid uuid
 * @returns user
 */
async function findByUuid(uuid: string): Promise<UserEntity> {
	const user = await UserRepository.findByUuid(uuid);
	if (user === null) {
		AppError.raise(errorMessages.user.param.id.notFound(uuid));
	}
	return user;
}

/**
 * find user by email
 * @param email email
 * @returns user or null
 */
async function findByEmail(email: string): Promise<UserEntity | null> {
	return await UserRepository.findByEmail(email);
}

/**
 * find authorized user
 * by sessionID
 * @param req request
 * @returns user
 */
export async function findAuthorizedUser(req: express.Request): Promise<UserEntity> {
	const user = await UserRepository.findBySessionId(req.sessionID);
	if(user === null) {
		AppError.raise(errorMessages.general.unauthorized);
	}
	return user;
}

/**
 * create user
 * @param email email
 * @returns user
 */
async function create(email: string): Promise<UserEntity> {
	const user = UserEntity.factory({
		email: email,
	});
	await UserRepository.save(user);

	return user;
}

/**
 * create and send email to user to confirm email to signup
 * @param email email
 * @returns void
 */
export async function createAndSendEmail(email: string): Promise<void> {
	const existUser = await findByEmail(email);
	if (existUser) {
		return;
	}

	const user = await create(email);

	EmailUsecase.sendConfirmToCreateUser(user);
}

/**
 * signup user
 * @param userId userId
 * @param password password
 * @returns user
 */
export async function signUp(userId: string, password: string): Promise<UserEntity> {
	const user = await findByUuid(userId);
	if(user.isSignedUp()) {
		AppError.raise(errorMessages.user.alreadySignedUp);
	}
	await user.setPassword(password);
	await UserRepository.save(user);

	return user;
}

/**
 * login user
 * @param req request
 * @param email email
 * @param password password
 * @returns void
 */
export async function login(req: express.Request, email: string, password: string): Promise<UserEntity> {
	const user = await findByEmail(email);
	if(user === null || !user.isAvailable()) {
		AppError.raise(errorMessages.user.login);
	}
	if(!user.verifyPassword(password)) {
		AppError.raise(errorMessages.user.login);
	}

	await SessionUsecase.create(req, user.id);
	return user;
}

/**
 * disable cookie to logout
 * @param req request
 * @returns void
 */
export async function logout(req: express.Request): Promise<void> {
	await SessionUsecase.remove(req);
}

/**
 * convert user entity to response
 * @param user user entity
 * @returns user response
 */
export function toResponse(user: UserEntity): UserForMe {
	const email = user.email;
	if(email === null) {
		AppError.raise(errorMessages.general.internalServerError);
	}

	return {
		id: user.uuid,
		email: email,
	};
}
