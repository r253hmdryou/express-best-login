import * as UserUsecase from "features/users/UserUsecase";
/**
 * POST /v1/users
 * @param email email
 * @returns void
 */
export async function post(email: string): Promise<void> {
	await UserUsecase.createAndSendEmail(email);
}
