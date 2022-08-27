import { sequelize } from "common/repository";
import { AppError } from "libs/error/AppError";
import { errorMessages } from "libs/error/messages";
import { User, V1 } from "types/api";
import { UserEntity } from "./userEntity";
import * as repository from "./userRepository";

/**
 * すべてのユーザーを取得する
 * @returns ユーザー一覧
 */
export async function findAll(): Promise<repository.UsersAndCount> {
	const users = await repository.findAll();
	return users;
}

/**
 * UUIDからユーザーを取得する
 * @param uuid UUID
 * @returns ユーザー
 * @throws ユーザーが存在しない場合
 */
export async function findByUuid(uuid: string): Promise<UserEntity> {
	const user = await repository.findByUuid(uuid);

	if(user === null) {
		AppError.raise(errorMessages.user.params.id.notFound(uuid));
	}

	return user;
}

/**
 * ユーザーを作成する
 * @param reqBody リクエストボディ
 * @returns ユーザー
 */
export async function create(reqBody: V1.CreateUser.RequestBody): Promise<UserEntity> {
	const appError = AppError.factory(errorMessages.user.create);
	if(await existsLoginId(reqBody.loginId)) {
		appError.addError(errorMessages.user.params.loginId.duplication(reqBody.loginId));
	}
	appError.raiseIfError();

	const user = UserEntity.factory({
		loginId: reqBody.loginId,
		password: reqBody.password,
	});
	return await sequelize.transaction(async(transaction) => {
		await repository.save(user, transaction);
		return user;
	});
}

/**
 * ユーザーを更新する
 * @param user ユーザー
 * @param reqBody リクエストボディ
 * @returns ユーザー
 */
export async function update(user: UserEntity, reqBody: V1.UpdateUser.RequestBody): Promise<UserEntity> {
	user.email = reqBody.email;
	return await sequelize.transaction(async(transaction) => {
		await repository.save(user, transaction);
		return user;
	});
}

/**
 * ログインIDが既に存在するかどうか
 * @param loginId ログインID
 * @returns 存在する場合true
 */
async function existsLoginId(loginId: string): Promise<boolean> {
	const user = await repository.findByLoginId(loginId);
	return user !== null;
}

/**
 * レスポンスに変換する
 * @param user ユーザー
 * @returns レスポンス
 */
export function toResponse(user: UserEntity): User {
	return {
		id: user.uuid,
		email: user.email,
	};
}
