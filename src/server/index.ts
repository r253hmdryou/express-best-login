import http from "http";
import app from "app";
import { closeDatabase, sequelize } from "common/repository";

main();

/**
 * main function
 * @returns void
 */
function main(): void {
	const server = app.listen(3000);

	sequelize.authenticate()
		.then(() => {
			console.log("Connection to database has been established successfully.");
		})
		.catch((error) => {
			console.error("Unable to connect to the database:", error);
			gracefulShutdown(server);
		});

	process
		.on("SIGINT", () => {
			console.log("SIGINT");
			gracefulShutdown(server);
		})
		.on("SIGTERM", () => {
			console.log("SIGTERM");
			gracefulShutdown(server);
		});
}

/**
 * gracefulShutdown function
 * @param server http server
 * @returns void
 */
function gracefulShutdown(server: http.Server): void {
	server.close((error) => {
		if (error) {
			console.error(error);
			process.exit(1);
		}
		console.log("closing database connection...");
		closeDatabase()
			.then(() => {
				console.log("database connection closed.");
				process.exit(0);
			})
			.catch((error) => {
				console.error(error);
				process.exit(1);
			});
	});
}
