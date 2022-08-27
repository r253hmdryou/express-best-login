module.exports = {
	"development": {
		"username": process.env.RDB_MIGRATION_USER,
		"password": process.env.RDB_MIGRATION_PASS,
		"database": process.env.RDB_MIGRATION_DATABASE,
		"host": process.env.RDB_MIGRATION_HOST,
		"port": process.env.RDB_MIGRATION_PORT,
		"dialect": process.env.RDB_MIGRATION_DIALECT,
	},
	"test": {
		"username": process.env.RDB_MIGRATION_USER,
		"password": process.env.RDB_MIGRATION_PASS,
		"database": process.env.RDB_MIGRATION_DATABASE,
		"host": process.env.RDB_MIGRATION_HOST,
		"port": process.env.RDB_MIGRATION_PORT,
		"dialect": process.env.RDB_MIGRATION_DIALECT,
	},
	"production": {
		"username": process.env.RDB_MIGRATION_USER,
		"password": process.env.RDB_MIGRATION_PASS,
		"database": process.env.RDB_MIGRATION_DATABASE,
		"host": process.env.RDB_MIGRATION_HOST,
		"port": process.env.RDB_MIGRATION_PORT,
		"dialect": process.env.RDB_MIGRATION_DIALECT,
	},
};
