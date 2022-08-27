// import { glob } from "glob";
import { config } from "libs/config";
import {Sequelize} from "sequelize";

export const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
	host: config.db.host,
	port: config.db.port,
	dialect: "mariadb",
	logging: config.db.logging,
});

/**
 * close the connection to the database
 * @returns void
 */
export async function closeDatabase(): Promise<void> {
	await sequelize.close();
}
