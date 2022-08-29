import { SessionModel } from "common/models/SessionModel";
import { UserModel } from "common/models/UserModel";
import { UserEntity } from "./UserEntity";

/**
 * find user by uuid
 * @param uuid uuid
 * @returns user
 */
export async function findByUuid(uuid: string): Promise<UserEntity | null> {
	const model = await UserModel.findOne({
		where: {
			uuid: uuid,
		},
	});

	if(model === null) {
		return null;
	}
	return UserEntity.fromModel(model);
}

/**
 * find user by email
 * @param email email
 * @returns user or null
 */
export async function findByEmail(email: string): Promise<UserEntity | null>{
	const model = await UserModel.findOne({
		where: {
			email: email,
		},
	});
	if(model === null){
		return null;
	}
	return UserEntity.fromModel(model);
}

/**
 * find user by sessionID
 * @param sessionId sessionID
 * @returns user or null
 */
export async function findBySessionId(sessionId: string): Promise<UserEntity | null> {
	const model = await UserModel.findOne({
		include: [
			{
				model: SessionModel,
				required: true,
				where: {
					sessionId: sessionId,
				},
			},
		],
	});

	if(model === null) {
		return null;
	}
	return UserEntity.fromModel(model);
}

/**
 * save user
 * @param user user entity
 * @returns void
 */
export async function save(user: UserEntity): Promise<void>{
	const model = toModel(user);
	await model.save();
}

/**
 * convert user entity to user model
 * @param user user entity
 * @returns user model
 */
function toModel(user: UserEntity): UserModel{
	const model = new UserModel();

	if(!user.isNewRecord) {
		model.id = user.id;
		model.isNewRecord = false;
	}
	model.uuid = user.uuid;
	model.email = user.email;
	model.password = user.password;
	model.createdAt = user.createdAt;
	model.deletedAt = user.deletedAt;

	return model;
}
