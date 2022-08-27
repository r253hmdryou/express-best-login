import { sequelize } from "common/repository";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute } from "sequelize";
import {UserModel} from "./UserModel";

const TABLENAME = "user_profiles";

export class UserProfileModel extends Model<InferAttributes<UserProfileModel>, InferCreationAttributes<UserProfileModel>> {
	declare id: CreationOptional<number>;
	declare userId: ForeignKey<UserModel["id"]>;
	declare user?: NonAttribute<UserModel>;
	declare firstName: string | null;
	declare lastName: string | null;
	declare middleName: string | null;
	declare firstNameKana: string | null;
	declare lastNameKana: string | null;
	declare middleNameKana: string | null;
	declare email: string | null;
}

UserProfileModel.init({
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.BIGINT.UNSIGNED,
	},
	userId: {
		comment: "ユーザーID",
		allowNull: false,
		type: DataTypes.BIGINT.UNSIGNED,
	},
	firstName: {
		comment: "名",
		allowNull: true,
		type: DataTypes.STRING(255),
	},
	lastName: {
		comment: "姓",
		allowNull: true,
		type: DataTypes.STRING(255),
	},
	middleName: {
		comment: "ミドルネーム",
		allowNull: true,
		type: DataTypes.STRING(255),
	},
	firstNameKana: {
		comment: "名(カナ)",
		allowNull: true,
		type: DataTypes.STRING(255),
	},
	lastNameKana: {
		comment: "姓(カナ)",
		allowNull: true,
		type: DataTypes.STRING(255),
	},
	middleNameKana: {
		comment: "ミドルネーム(カナ)",
		allowNull: true,
		type: DataTypes.STRING(255),
	},
	email: {
		comment: "メールアドレス",
		allowNull: true,
		type: DataTypes.STRING(255),
	},
}, {
	sequelize,
	tableName: TABLENAME,
	underscored: true,
	timestamps: false,
	indexes: [
		{
			unique: true,
			name: `UNQ:${TABLENAME}:user_id`,
			fields: ["user_id"],
		},
	],
});
