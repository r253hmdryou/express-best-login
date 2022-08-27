import { Transaction } from "sequelize";

import {UserAccountModel} from "common/models/UserAccountModel";
import {UserModel} from "common/models/UserModel";
import {UserProfileModel} from "common/models/UserProfileModel";

import { UserEntity } from "./userEntity";

export interface UsersAndCount {
	count: number;
	users: UserEntity[];
}

/**
 * すべてのユーザーを取得する
 * @returns ユーザー一覧
 */
export async function findAll(): Promise<UsersAndCount> {
	const result = await UserModel.scope(["withProfile"]).findAndCountAll();

	return {
		count: result.count,
		users: result.rows.map(toEntity),
	};
}

/**
 * UUIDからユーザーを取得する
 * @param uuid UUID
 * @returns ユーザー
 * @throws ユーザーが存在しない場合
 */
export async function findByUuid(uuid: string): Promise<UserEntity | null> {
	const model = await UserModel.scope(["withProfile"]).findOne({
		where: {
			uuid,
		},
	});

	if(model === null) {
		return null;
	}

	return toEntity(model);
}

/**
 *
 * @param loginId ログインID
 * @returns ユーザー
 */
export async function findByLoginId(loginId: string): Promise<UserEntity | null> {
	const model = await UserModel.findOne({
		include: {
			model: UserAccountModel,
			as: "account",
			where: {
				loginId,
			},
			required: true,
		},
	});

	if(model === null){
		return null;
	}

	return toEntity(model);
}

/**
 * ユーザーを保存する
 * @param user ユーザー
 * @param transaction トランザクション
 * @returns void
 */
export async function save(user: UserEntity, transaction: Transaction): Promise<void> {
	const model = toModel(user);
	await model.save({transaction});

	await save$account(user, model, transaction);
	await save$profile(user, model, transaction);
}

/**
 * UserAccountを保存する
 * @param user User
 * @param model Model
 * @param transaction Transaction
 * @returns void
 */
async function save$account(user: UserEntity, model: UserModel, transaction: Transaction): Promise<void> {
	if(!user.isChangeAccount) {
		return;
	}
	if(model.account === undefined){
		throw new Error("account is undefined");
	}

	if(model.account === null) {
		await UserAccountModel.destroy({
			where: {
				userId: model.id,
			},
			transaction,
		});
	} else {
		model.account.userId = model.id;
		await model.account.save({transaction});
	}
}

/**
 * UserProfileを保存する
 * @param user User
 * @param model Model
 * @param transaction Transaction
 * @returns void
 */
async function save$profile(user: UserEntity, model: UserModel, transaction: Transaction): Promise<void> {
	if(!user.isChangeProfile) {
		return;
	}
	if(model.profile === undefined){
		throw new Error("profile is undefined");
	}

	if(model.profile === null) {
		await UserProfileModel.destroy({
			where: {
				userId: model.id,
			},
			transaction,
		});
	} else {
		model.profile.userId = model.id;
		await model.profile.save({transaction});
	}
}

/**
 * Entityに変換する
 * @param model Model
 * @returns Entity
 */
function toEntity(model: UserModel): UserEntity {
	const entity = UserEntity.fromModel(model);

	return entity;
}

/**
 * Modelに変換する
 * @param entity Entity
 * @returns Model
 */
function toModel(entity: UserEntity): UserModel {
	const model = new UserModel();

	model.isNewRecord = entity.isNewRecord;
	if(!entity.isNewRecord) {
		model.id = entity.id;
	}
	model.uuid = entity.uuid;
	model.createdAt = entity.createdAt;

	model.account = toModel$account(entity);
	model.profile = toModel$profile(entity);

	return model;
}

/**
 * Modelに変換する
 * @param entity Entity
 * @returns Model
 */
function toModel$account(entity: UserEntity): UserAccountModel | null | undefined {
	if(entity.account === null) {
		return null;
	}
	if(entity.account === undefined) {
		return undefined;
	}
	const model = new UserAccountModel();
	model.isNewRecord = entity.account.isNewRecord;
	if(!entity.account.isNewRecord) {
		model.id = entity.account.id;
		model.userId = entity.id;
	}
	model.loginId = entity.account.loginId;
	model.password = entity.account.password;

	return model;
}

/**
 * Modelに変換する
 * @param entity Entity
 * @returns Model
 */
function toModel$profile(entity: UserEntity): UserProfileModel | null | undefined {
	if(entity.profile === null) {
		return null;
	}
	if(entity.profile === undefined) {
		return undefined;
	}
	const model = new UserProfileModel();
	model.isNewRecord = entity.profile.isNewRecord;
	if(!entity.profile.isNewRecord) {
		model.id = entity.profile.id;
		model.userId = entity.id;
	}
	model.firstName = entity.profile.firstName;
	model.lastName = entity.profile.lastName;
	model.middleName = entity.profile.middleName;
	model.firstNameKana = entity.profile.firstNameKana;
	model.lastNameKana = entity.profile.lastNameKana;
	model.middleNameKana = entity.profile.middleNameKana;
	model.email = entity.profile.email;

	return model;
}
