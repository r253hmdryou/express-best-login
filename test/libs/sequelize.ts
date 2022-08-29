import {Options, Sequelize} from "sequelize";
import {SequelizeStorage, Umzug} from "umzug";
import {config} from "libs/config";
import { sequelize, store } from "common/repository";

const rootOptions: Options = {
	username: "root",
	password: config.db.password,
	host: config.db.host,
	port: config.db.port,
	dialect: "mariadb",
	logging: config.db.logging,
};

export const rootSequelize = new Sequelize(rootOptions);

/**
 * connect to the in memory database
 * @returns sequelize
 */
export async function createInMemoryDatabase(): Promise<Sequelize> {
	const rootQueryInterface = rootSequelize.getQueryInterface();
	await rootQueryInterface.dropDatabase(config.db.database);
	await rootQueryInterface.createDatabase(config.db.database);
	await rootQueryInterface.sequelize.query(`GRANT ALL PRIVILEGES ON ${config.db.database}.* TO ${config.db.user}@'%' IDENTIFIED BY '${config.db.password}'`);

	const migrationSequelize = new Sequelize({
		...rootOptions,
		database: config.db.database,
	});

	const storage = new SequelizeStorage({
		sequelize: migrationSequelize,
	});

	const umzug = new Umzug({
		migrations: {
			glob: "dist/db/migrations/*.js",
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			resolve: ({name, path, context}): any => {
				// eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any
				const migration = require(path as any);
				return {
					name,
					up: async(): Promise<void> => {
						return await migration.up(context, migrationSequelize);
					},
				};
			},
		},
		storage: storage,
		context: migrationSequelize.getQueryInterface(),
		logger: undefined,
	});
	await umzug.up();
	await migrationSequelize.close();

	return sequelize;
}

/**
 * drop the in memory database
 * @returns void
 */
export async function migrationDown(): Promise<void> {
	const migrationSequelize = new Sequelize({
		...rootOptions,
		database: config.db.database,
	});

	const storage = new SequelizeStorage({
		sequelize: migrationSequelize,
	});

	const umzug = new Umzug({
		migrations: {
			glob: "dist/db/migrations/*.js",
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			resolve: ({name, path, context}): any => {
				// eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any
				const migration = require(path as any);
				return {
					name,
					down: async(): Promise<void> => {
						return await migration.down(context, migrationSequelize);
					},
				};
			},
		},
		storage: storage,
		context: migrationSequelize.getQueryInterface(),
		logger: undefined,
	});
	await umzug.down({
		to: 0,
	});

	await migrationSequelize.close();
}
/**
 * drop the database
 * @param sequelize sequelize
 * @returns void
 */
export async function dropDatabase(sequelize: Sequelize): Promise<void> {
	store.close();
	await rootSequelize.getQueryInterface().dropDatabase(sequelize.getDatabaseName());
	await rootSequelize.close();
	await sequelize.close();
}
