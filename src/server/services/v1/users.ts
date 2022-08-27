import * as userUsecase from "features/users/userUsecase";

import {V1} from "types/api";

/**
 * GET /v1/users
 * get users
 * @returns users and count
 */
export async function get(): Promise<V1.GetUsers.ResponseBody> {
	const result = await userUsecase.findAll();
	return {
		count: result.count,
		users: result.users.map(userUsecase.toResponse),
	};
}

/**
 * POST /v1/users
 * create user
 * @param reqBody request body
 * @returns user
 */
export async function post(reqBody: V1.CreateUser.RequestBody): Promise<V1.CreateUser.ResponseBody> {
	const user = await userUsecase.create(reqBody);
	return userUsecase.toResponse(user);
}

/**
 * GET /v1/users/:userId
 * @param requestParams request params
 * @returns user
 */
export async function getUserId(requestParams: V1.GetUser.RequestParams): Promise<V1.GetUser.ResponseBody> {
	const user = await userUsecase.findByUuid(requestParams.userId);
	return userUsecase.toResponse(user);
}

/**
 * PUT /v1/users/:userId
 * @param requestParams request params
 * @param reqBody request body
 * @returns user
 */
export async function putUserId(requestParams: V1.UpdateUser.RequestParams, reqBody: V1.UpdateUser.RequestBody): Promise<V1.UpdateUser.ResponseBody> {
	const user = await userUsecase.findByUuid(requestParams.userId);
	const updatedUser = await userUsecase.update(user, reqBody);
	return userUsecase.toResponse(updatedUser);
}
