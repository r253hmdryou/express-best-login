import { sequelize } from "common/repository";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute } from "sequelize";
import {UserModel} from "./UserModel";

const TABLENAME = "user_accounts";

export class UserAccountModel extends Model<InferAttributes<UserAccountModel>, InferCreationAttributes<UserAccountModel>> {
	declare id: CreationOptional<number>;
	declare userId: ForeignKey<UserModel["id"]>;
	declare user?: NonAttribute<UserModel>;
	declare loginId: string;
	declare password: string;
}

UserAccountModel.init({
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
	loginId: {
		comment: "ログインID",
		allowNull: false,
		type: DataTypes.STRING(255),
	},
	password: {
		comment: "パスワード",
		allowNull: false,
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
			name: `UNX:${TABLENAME}:user_id`,
			fields: ["user_id"],
		},
		{
			unique: true,
			name: `UNX:${TABLENAME}:login_id`,
			fields: ["login_id"],
		},
	],
});
