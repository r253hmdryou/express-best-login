import { sequelize } from "common/repository";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { SessionModel } from "./SessionModel";

const TABLENAME = "users";

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
	declare id: CreationOptional<number>;
	declare uuid: string;
	declare email: string | null; // if null, then user is deleted
	declare password: string | null;
	declare createdAt: number;
	declare deletedAt: number | null;

	declare sessions?: NonAttribute<SessionModel[]>;
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
		allowNull: true,
		type: DataTypes.STRING,
		unique: true,
	},
	password: {
		comment: "password",
		allowNull: true,
		type: DataTypes.STRING,
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

UserModel.hasMany(SessionModel, {
	foreignKey: "userId",
});

SessionModel.belongsTo(UserModel, {
	foreignKey: "userId",
	targetKey: "id",
});
