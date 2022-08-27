import { sequelize } from "common/repository";
import { CreationOptional, DataTypes, HasOneCreateAssociationMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import {UserAccountModel} from "./UserAccountModel";
import {UserProfileModel} from "./UserProfileModel";

const TABLENAME = "users";

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
	declare id: CreationOptional<number>;
	declare uuid: string;
	declare createdAt: number;
	declare deletedAt: number | null;

	declare createAccount: HasOneCreateAssociationMixin<UserAccountModel>;
	declare account?: NonAttribute<UserAccountModel> | null;

	declare createProfile: HasOneCreateAssociationMixin<UserProfileModel>;
	declare profile?: NonAttribute<UserProfileModel> | null;
}

UserModel.init({
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.BIGINT.UNSIGNED,
	},
	uuid: {
		comment: "UUID",
		allowNull: false,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
	},
	createdAt: {
		comment: "作成日時",
		allowNull: false,
		type: DataTypes.BIGINT.UNSIGNED,
		defaultValue: Date.now(),
	},
	deletedAt: {
		comment: "削除日時",
		allowNull: true,
		type: DataTypes.BIGINT.UNSIGNED,
		defaultValue: null,
	},
}, {
	sequelize,
	tableName: TABLENAME,
	underscored: true,
	timestamps: false,
	indexes: [
		{
			unique: true,
			name: `UNX:${TABLENAME}:uuid`,
			fields: ["uuid"],
		},
		{
			unique: false,
			name: `IDX:${TABLENAME}:created_at`,
			fields: ["created_at"],
		},
		{
			unique: false,
			name: `IDX:${TABLENAME}:deleted_at`,
			fields: ["deleted_at"],
		},
	],
	scopes: {
		withAccount: {
			include: [
				{
					model: UserAccountModel,
					as: "account",
					required: false,
				},
			],
		},
		withProfile: {
			include: [
				{
					model: UserProfileModel,
					as: "profile",
					required: false,
				},
			],
		},
	},
});

UserAccountModel.belongsTo(UserModel, {
	foreignKey: "user_id",
	targetKey: "id",
	as: "user",
});

UserModel.hasOne(UserAccountModel, {
	foreignKey: "user_id",
	sourceKey: "id",
	as: "account",
});

UserProfileModel.belongsTo(UserModel, {
	foreignKey: "user_id",
	targetKey: "id",
	as: "user",
});

UserModel.hasOne(UserProfileModel, {
	foreignKey: "user_id",
	sourceKey: "id",
	as: "profile",
});
