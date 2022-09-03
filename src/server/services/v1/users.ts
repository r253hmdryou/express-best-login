import { UserEntity } from "features/users/UserEntity";
import * as UserUsecase from "features/users/UserUsecase";
import { Users } from "types/api";

/**
 * POST /v1/users
 * confirm email to create user
 * @param email email
 * @returns void
 */
export async function post(email: string): Promise<void> {
	await UserUsecase.createAndSendEmail(email);
}

/**
 * GET /v1/users/me
 * get my user
 * @param user user
 * @returns user
 */
export function getMe(user: UserEntity): Users.GetMyUser.ResponseBody {
	return UserUsecase.toResponse(user);
}

/**
 * POST /v1/users/:userId
 * signup user
 * @param userId userId
 * @param password password
 * @returns user
 */
export async function postUserId(userId: string, password: string): Promise<Users.SignUp.ResponseBody> {
	const user = await UserUsecase.signUp(userId, password);
	return UserUsecase.toResponse(user);
}
