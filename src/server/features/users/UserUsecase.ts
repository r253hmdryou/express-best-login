import * as EmailUsecase from "features/emails/EmailUsecase";

import { UserEntity } from "./UserEntity";
import * as UserRepository from "./UserRepository";

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
export async function create(email: string): Promise<UserEntity> {
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
