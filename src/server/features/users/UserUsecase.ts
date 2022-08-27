import { AppError } from "libs/error/AppError";
import { errorMessages } from "libs/error/messages";

import * as EmailUsecase from "features/emails/EmailUsecase";

import { UserEntity } from "./UserEntity";
import * as UserRepository from "./UserRepository";

import { User } from "types/api";

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
 * convert user entity to response
 * @param user user entity
 * @returns user response
 */
export function toResponse(user: UserEntity): User {
	const email = user.email;
	if(email === null) {
		AppError.raise(errorMessages.general.internalServerError);
	}

	return {
		id: user.uuid,
		email: email,
	};
}
