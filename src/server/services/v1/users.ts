import * as UserUsecase from "features/users/UserUsecase";
import { V1 } from "types/api";

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
 * POST /v1/users/:userId
 * signup user
 * @param userId userId
 * @param password password
 * @returns user
 */
export async function postUserId(userId: string, password: string): Promise<V1.SignUp.ResponseBody> {
	const user = await UserUsecase.signUp(userId, password);
	return UserUsecase.toResponse(user);
}
