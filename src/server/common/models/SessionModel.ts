import { sequelize } from "common/repository";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey, NonAttribute } from "sequelize";
import { UserModel } from "./UserModel";

const TABLENAME = "sessions";

export class SessionModel extends Model<InferAttributes<SessionModel>, InferCreationAttributes<SessionModel>> {
	declare id: CreationOptional<number>;
	declare sessionId: string;
	declare userId: ForeignKey<number | null>;
	declare user: NonAttribute<UserModel>;
	declare expiresAt: number;
	declare data: string;
}

SessionModel.init({
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.BIGINT.UNSIGNED,
	},
	sessionId: {
		comment: "session id",
		allowNull: false,
		type: DataTypes.STRING,
		unique: true,
	},
	userId: {
		comment: "user id",
		allowNull: true,
		type: DataTypes.BIGINT.UNSIGNED,
	},
	expiresAt: {
		comment: "expires at",
		allowNull: false,
		type: DataTypes.INTEGER.UNSIGNED,
	},
	data: {
		comment: "data",
		allowNull: true,
		type: DataTypes.JSON,
	},
}, {
	sequelize,
	tableName: TABLENAME,
	underscored: true,
	timestamps: false,
});
