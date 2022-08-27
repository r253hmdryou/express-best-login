import { sequelize } from "common/repository";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

const TABLENAME = "users";

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
	declare id: CreationOptional<number>;
	declare uuid: string;
	declare email: string;
	declare createdAt: number;
	declare deletedAt: number | null;

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
		unique: true,
	},
	email: {
		comment: "email",
		allowNull: false,
		type: DataTypes.STRING,
		unique: true,
	},
	createdAt: {
		comment: "created at",
		allowNull: false,
		type: DataTypes.BIGINT.UNSIGNED,
		defaultValue: Date.now(),
	},
	deletedAt: {
		comment: "deleted at",
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
});
