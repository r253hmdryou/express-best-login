import { closeDatabase } from "common/repository";
import { createInMemoryDatabase, dropDatabase, migrationDown } from "../libs/sequelize";

{
	describe("migration test", testMigrations);
}

/**
 * test about user
 * @returns void
 */
function testMigrations(): void {
	test("migration", async() => {
		// migration up
		const sequelize = await createInMemoryDatabase();

		{
			const result = await sequelize.getQueryInterface().showAllTables();
			expect(result.length).toBeGreaterThan(1); // TODO: change length to more than 1 if you add more tables
		}

		await migrationDown();
		// database is empty - only SequelizeMeta
		{
			const result = await sequelize.getQueryInterface().showAllTables();
			expect(result).toEqual([
				{
					schema: expect.any(String), // ignore database name test because variable
					tableName: "SequelizeMeta",
				},
			]);
		}

		// still connecting
		{
			const result = sequelize.query("SELECT 1");
			await expect(result).resolves.toBeTruthy();
		}

		// close database connection
		await closeDatabase();

		// cannot execute query because connection is closed
		{
			const result = sequelize.query("SELECT 1");
			await expect(result).rejects.toThrow();
		}

		await dropDatabase(sequelize);
	});
}
