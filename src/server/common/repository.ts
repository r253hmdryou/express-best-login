import { config } from "libs/config";
import {Sequelize} from "sequelize";
import * as session from "express-session";
import expressMysqlSession from "express-mysql-session";

export const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
	host: config.db.host,
	port: config.db.port,
	dialect: "mariadb",
	logging: config.db.logging,
});

export const store = new (expressMysqlSession(session))({
	host: config.db.host,
	port: config.db.port,
	user: config.db.user,
	password: config.db.password,
	database: config.db.database,
	createDatabaseTable: false,
	schema: {
		tableName: "sessions",
		columnNames: {
			session_id: "session_id",
			expires: "expires_at",
			data: "data",
		},
	},
});

/**
 * close the connection to the database
 * @returns void
 */
export async function closeDatabase(): Promise<void> {
	await sequelize.close();
	store.close();
}
