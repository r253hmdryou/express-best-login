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
			code: "userCreate",
			message: "Failed to create user",
		},
		param: {
			email: {
				default: {
					status: STATUS.BAD_REQUEST,
					code: "invalidUserParamEmail",
					message: "Invalid email",
				},
				pattern: {
					status: STATUS.BAD_REQUEST,
					code: "invalidUserParamEmailPattern",
					message: "Invalid email pattern",
				},
			},
		},
	},
};
