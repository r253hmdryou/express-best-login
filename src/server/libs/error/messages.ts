import { STATUS } from "./AppError";

export interface ErrorMessage {
	status: STATUS,
	code: string;
	message: string;
}

export const errorMessages = {
	api: {
		headerRequired: {
			status: STATUS.BAD_REQUEST,
			code: "apiHeaderRequired",
			message: "required header is missing, please set X-Requested-With",
		},
	},
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
		signup: {
			code: "userSignup",
			message: "Failed to signup user",
		},
		alreadySignedUp: {
			status: STATUS.FORBIDDEN,
			code: "userAlreadySignedUp",
			message: "User already signed up",
		},
		login: {
			status: STATUS.UNAUTHORIZED,
			code: "userLogin",
			message: "Failed to login user",
		},
		param: {
			id: {
				notFound: (id: string): ErrorMessage => ({
					status: STATUS.NOT_FOUND,
					code: "userIdNotFound",
					message: `User not found. id: ${id}`,
				}),
			},
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
			password: {
				default: {
					status: STATUS.BAD_REQUEST,
					code: "invalidUserParamPassword",
					message: "Invalid password",
				},
				minLength: (minLength: number): ErrorMessage => ({
					status: STATUS.BAD_REQUEST,
					code: "invalidUserParamPasswordMinLength",
					message: `Invalid password. Minimum length is ${minLength}`,
				}),
				maxLength: (maxLength: number): ErrorMessage => ({
					status: STATUS.BAD_REQUEST,
					code: "invalidUserParamPasswordMaxLength",
					message: `Invalid password. Maximum length is ${maxLength}`,
				}),
			},
		},
	},
};
