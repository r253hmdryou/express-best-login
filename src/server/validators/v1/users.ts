import express from "express";
import vs from "value-schema";

import { AppError } from "libs/error/AppError";
import { ErrorMessage, errorMessages } from "libs/error/messages";

import { V1 } from "types/api";
import { RULE } from "../common";
import { Key } from "value-schema/dist/libs/types";

const schemaBodyPost = {
	email: vs.email(),
};

/**
 * POST /v1/users
 * confirm email to create user
 * @param req request
 * @returns RequestBody
 */
export function BodyPost(req: express.Request): V1.ConfirmEmailToCreateUser.RequestBody {
	const appError = AppError.factory(errorMessages.user.create);

	return vs.applySchemaObject(schemaBodyPost, req.body, (error) => {
		const key = error.keyStack.shift();
		appError.addError(assignUserValidationError(key, error.rule));
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
	default:
		return errorMessages.general.badRequest;
	}
}
