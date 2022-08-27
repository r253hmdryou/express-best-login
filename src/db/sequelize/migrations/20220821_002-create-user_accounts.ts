import {DataTypes, QueryInterface, Sequelize} from "sequelize";

const TABLENAME = "user_accounts";
const TABLENAME2 = "users";

/**
 * up
 * @param queryInterface QueryInterface
 * @param _sequelize Sequelize
 * @returns void
 */
export async function up(queryInterface: QueryInterface, _sequelize: Sequelize): Promise<void> {
	await queryInterface.createTable(TABLENAME, {
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.BIGINT.UNSIGNED,
		},
		user_id: {
			comment: "ユーザーID",
			allowNull: false,
			type: DataTypes.BIGINT.UNSIGNED,
		},
		login_id: {
			comment: "ログインID",
			allowNull: false,
			type: DataTypes.STRING(32),
		},
		password: {
			comment: "パスワード",
			allowNull: false,
			type: DataTypes.STRING(128),
		},
	});

	await queryInterface.addIndex(TABLENAME, {
		unique: true,
		name: `UNQ:${TABLENAME}:user_id`,
		fields: ["user_id"],
	});
	await queryInterface.addIndex(TABLENAME, {
		unique: true,
		name: `UNQ:${TABLENAME}:login_id`,
		fields: ["login_id"],
	});

	await queryInterface.addConstraint(TABLENAME, {
		type: "foreign key",
		name: `FK:${TABLENAME2}:user_id`,
		fields: ["user_id"],
		references: {
			table: TABLENAME2,
			field: "id",
		},
		onDelete: "cascade",
		onUpdate: "cascade",
	});
}

/**
 * down
 * @param queryInterface QueryInterface
 * @param _sequelize Sequelize
 * @returns void
 */
export async function down(queryInterface: QueryInterface, _sequelize: Sequelize): Promise<void> {
	await queryInterface.dropTable(TABLENAME);
}
