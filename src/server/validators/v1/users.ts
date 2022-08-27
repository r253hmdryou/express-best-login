import express from "express";
import vs from "value-schema";
import { Key } from "value-schema/dist/libs/types";

import { AppError } from "libs/error/AppError";
import { ErrorMessage, errorMessages } from "libs/error/messages";

import { paramUserId, RULE } from "validators/common";

import { V1 } from "types/api";

const schemaBodyPostUsers = {
	loginId: vs.string({
		maxLength: 250,
	}),
	password: vs.string({
		minLength: 8,
	}),
};

const schemaBodyPutUsers = {
	email: vs.email(),
};

export const paramsGetUserId: (req: express.Request) => V1.GetUser.RequestParams = paramUserId;

/**
 * POST /v1/users
 * @param req request
 * @returns parameter
 */
export function bodyPostUsers(req: express.Request): V1.CreateUser.RequestBody {
	const appError = AppError.factory(errorMessages.user.create);

	return vs.applySchemaObject(schemaBodyPostUsers, req.body, (error) => {
		const key = error.keyStack.shift();
		appError.addError(assignUserValidationError(key, error.rule));
	}, () => {
		appError.raiseIfError();
	});
}

export const paramsPutUserId: (req: express.Request) => V1.UpdateUser.RequestParams = paramUserId;

/**
 * PUT /v1/users/:userId
 * @param req request
 * @returns parameter
 */
export function bodyPutUserId(req: express.Request): V1.UpdateUser.RequestBody {
	const appError = AppError.factory(errorMessages.user.update);

	return vs.applySchemaObject(schemaBodyPutUsers, req.body, (error) => {
		const key = error.keyStack.shift();
		appError.addError(assignUserValidationError(key, error.rule));
	}, () => {
		appError.raiseIfError();
	});
}

/**
 * エラーを追加する
 * @param key エラーのキー
 * @param rule エラー原因
 * @returns void
 */
function assignUserValidationError(key: Key| undefined, rule: RULE): ErrorMessage{
	switch(key) {
	case "loginId":
		switch(rule) {
		case vs.RULE.MAX_LENGTH:
			return errorMessages.user.params.loginId.maxLength;
		default:
			return errorMessages.user.params.loginId.default;
		}
	case "password":
		switch(rule) {
		case vs.RULE.MIN_LENGTH:
			return errorMessages.user.params.password.minLength;
		default:
			return errorMessages.user.params.password.default;
		}
	case "email":
		switch(rule) {
		case vs.RULE.PATTERN:
			return errorMessages.user.params.email.pattern;
		default:
			return errorMessages.user.params.email.default;
		}
	default:
		return errorMessages.general.badRequest;
	}
}
