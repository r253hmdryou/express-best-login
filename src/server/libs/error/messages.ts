import { STATUS } from "./AppError";

export interface ErrorMessage {
	status: STATUS,
	code: string;
	message: string;
}

export const errorMessages = {
	general: {
		badRequest: {
			status: STATUS.BAD_REQUEST,
			code: "badRequest",
			message: "Bad Request",
		},
		unauthorized: {
			status: STATUS.UNAUTHORIZED,
			code: "unauthorized",
			message: "Unauthorized",
		},
		forbidden: {
			status: STATUS.FORBIDDEN,
			code: "forbidden",
			message: "Forbidden",
		},
		notFound: {
			status: STATUS.NOT_FOUND,
			code: "apiNotFound",
			message: "API Not Found. Please check the URL.",
		},
		conflict: {
			status: STATUS.CONFLICT,
			code: "conflict",
			message: "Conflict",
		},
		internalServerError: {
			status: STATUS.INTERNAL_SERVER_ERROR,
			code: "internalServerError",
			message: "Internal Server Error",
		},
	},
	user: {
		create: {
			code: "failedToCreateUser",
			message: "Failed to create user",
		},
		update: {
			code: "failedToUpdateUser",
			message: "Failed to update user",
		},
		params: {
			id: {
				notFound: (uuid: string): ErrorMessage => ({
					status: STATUS.NOT_FOUND,
					code: "userNotFound",
					message: `User not found: ${uuid}`,
				}),
			},
			loginId: {
				default: {
					status: STATUS.BAD_REQUEST,
					code: "userLoginIdInvalid",
					message: "invalid loginId",
				},
				maxLength: {
					status: STATUS.BAD_REQUEST,
					code: "userLoginIdMaxLength",
					message: "loginId must be within 250 characters",
				},
				duplication: (loginId: string): ErrorMessage => ({
					status: STATUS.CONFLICT,
					code: "userLoginIdDuplication",
					message: `loginId already exists: ${loginId}`,
				}),
			},
			password: {
				default: {
					status: STATUS.BAD_REQUEST,
					code: "userPasswordInvalid",
					message: "invalid password",
				},
				minLength: {
					status: STATUS.BAD_REQUEST,
					code: "userPasswordMinLength",
					message: "password must be at least 8 characters",
				},
			},
			email: {
				default: {
					status: STATUS.BAD_REQUEST,
					code: "userEmailInvalid",
					message: "invalid email",
				},
				pattern: {
					status: STATUS.BAD_REQUEST,
					code: "userEmailInvalidPattern",
					message: "invalid email pattern",
				},
			},
		},
	},
};
