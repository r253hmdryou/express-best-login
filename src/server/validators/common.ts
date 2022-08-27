import express from "express";
import { AppError } from "libs/error/AppError";
import { errorMessages } from "libs/error/messages";
import { UserId } from "types/common";
import vs from "value-schema";
import { RULE } from "value-schema/dist/exporter";

export declare type RULE = typeof RULE[keyof typeof RULE];

const schemaParamUserId = {
	userId: vs.string({
		pattern: vs.STRING.PATTERN.UUID,
	}),
};

/**
 * /:userId
 * @param req request
 * @returns parameter
 */
export function paramUserId(req: express.Request): UserId {
	return vs.applySchemaObject(schemaParamUserId, req.params, () => {
		AppError.raise(errorMessages.user.param.id.notFound(req.params.userId));
	});
}
