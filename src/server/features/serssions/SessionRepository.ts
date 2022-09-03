import { Cookie } from "express-session";
import { SessionModel } from "common/models/SessionModel";
import { AppError } from "libs/error/AppError";
import { errorMessages } from "libs/error/messages";

/**
 * create session record
 * @param sessionId session
 * @param userId userId
 * @param cookie cookie
 * @returns void
 */
export async function create(sessionId: string, userId: number, cookie: Cookie): Promise<void> {
	const expires = cookie.expires;
	if(expires === undefined) {
		AppError.raise(errorMessages.general.internalServerError);
	}
	const data = {
		cookie: cookie,
	};
	await SessionModel.upsert({
		sessionId: sessionId,
		userId: userId,
		expiresAt: expires.valueOf() / 1000,
		data: JSON.stringify(data),
	}, {
		fields: ["userId"],
	});
}

/**
 * remove session record
 * @param sessionId session
 * @returns void
 */
export async function remove(sessionId: string): Promise<void> {
	await SessionModel.destroy({
		where: {
			sessionId: sessionId,
		},
	});
}
