import {DataTypes, QueryInterface, Sequelize} from "sequelize";
const TABLENAME = "sessions";

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
		session_id: {
			comment: "session id",
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
		},
		user_id: {
			comment: "user id",
			allowNull: true,
			type: DataTypes.BIGINT.UNSIGNED,
		},
		expires_at: {
			comment: "expires at",
			allowNull: false,
			type: DataTypes.INTEGER.UNSIGNED,
		},
		data: {
			comment: "data",
			allowNull: true,
			type: DataTypes.JSON,
		},
	});

	await queryInterface.addConstraint(TABLENAME, {
		type: "foreign key",
		name: `FK:${TABLENAME}:user_id`,
		fields: ["user_id"],
		references: {
			table: "users",
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
	await queryInterface.removeConstraint(TABLENAME, `FK:${TABLENAME}:user_id`);
	await queryInterface.dropTable(TABLENAME);
}
