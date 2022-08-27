import {DataTypes, QueryInterface, Sequelize} from "sequelize";
const TABLENAME = "users";

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
		uuid: {
			comment: "UUID",
			allowNull: false,
			type: DataTypes.UUID,
		},
		created_at: {
			comment: "作成日時",
			allowNull: false,
			type: DataTypes.BIGINT.UNSIGNED,
		},
		deleted_at: {
			comment: "削除日時",
			allowNull: true,
			type: DataTypes.BIGINT.UNSIGNED,
		},
	});

	await queryInterface.addIndex(TABLENAME, {
		unique: true,
		name: `UNX:${TABLENAME}:uuid`,
		fields: ["uuid"],
	});
	await queryInterface.addIndex(TABLENAME, {
		unique: false,
		name: `IDX:${TABLENAME}:created_at`,
		fields: ["created_at"],
	});
	await queryInterface.addIndex(TABLENAME, {
		unique: false,
		name: `IDX:${TABLENAME}:deleted_at`,
		fields: ["deleted_at"],
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
