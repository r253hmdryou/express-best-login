import {DataTypes, QueryInterface, Sequelize} from "sequelize";

const TABLENAME = "user_profiles";
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
		first_name: {
			comment: "名",
			allowNull: true,
			type: DataTypes.STRING(255),
		},
		last_name: {
			comment: "姓",
			allowNull: true,
			type: DataTypes.STRING(255),
		},
		middle_name: {
			comment: "ミドルネーム",
			allowNull: true,
			type: DataTypes.STRING(255),
		},
		first_name_kana: {
			comment: "名(カナ)",
			allowNull: true,
			type: DataTypes.STRING(255),
		},
		last_name_kana: {
			comment: "姓(カナ)",
			allowNull: true,
			type: DataTypes.STRING(255),
		},
		middle_name_kana: {
			comment: "ミドルネーム(カナ)",
			allowNull: true,
			type: DataTypes.STRING(255),
		},
		email: {
			comment: "メールアドレス",
			allowNull: true,
			type: DataTypes.STRING(255),
		},
	});

	await queryInterface.addIndex(TABLENAME, {
		unique: true,
		name: `UNQ:${TABLENAME}:user_id`,
		fields: ["user_id"],
	});

	await queryInterface.addConstraint(TABLENAME, {
		type: "foreign key",
		name: `FK:${TABLENAME}:user_id`,
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
