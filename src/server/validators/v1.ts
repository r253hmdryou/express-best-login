import express from "express";
import vs from "value-schema";
import { Key } from "value-schema/dist/libs/types";

import { config } from "libs/config";
import { AppError } from "libs/error/AppError";
import { ErrorMessage, errorMessages } from "libs/error/messages";

import { RULE } from "./common";
import { Login } from "types/api";

const schemaBodyPostLogin = {
	email: vs.email(),
	password: vs.string({
		minLength: config.user.password.minLength,
		maxLength: config.user.password.maxLength,
	}),
};

/**
 * POST /v1/login
 * login user
 * @param req request
 * @returns RequestBody
 */
export function BodyPostLogin(req: express.Request): Login.Login.RequestBody {
	const appError = AppError.factory(errorMessages.user.login);

	return vs.applySchemaObject(schemaBodyPostLogin, req.body, (error) => {
		const key = error.keyStack.shift();
		appError.addError(assignUserValidationError(key, error.rule));
	}, () => {
		appError.raiseIfError();
	});
}

/**
 * assign user validation error
 * @param key key
 * @param rule rule
 * @returns error message
 */
function assignUserValidationError(key: Key | undefined, rule: RULE): ErrorMessage {
	switch(key) {
	case "email":
		switch(rule) {
		case vs.RULE.PATTERN:
			return errorMessages.user.param.email.pattern;
		default:
			return errorMessages.user.param.email.default;
		}
	case "password":
		switch(rule) {
		case vs.RULE.MIN_LENGTH:
			return errorMessages.user.param.password.minLength(config.user.password.minLength);
		case vs.RULE.MAX_LENGTH:
			return errorMessages.user.param.password.maxLength(config.user.password.maxLength);
		default:
			return errorMessages.user.param.password.default;
		}
	default:
		return errorMessages.general.badRequest;
	}
}
