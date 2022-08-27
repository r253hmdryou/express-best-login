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
		// マイグレーションを実行
		const sequelize = await createInMemoryDatabase();

		{
			const result = await sequelize.getQueryInterface().showAllTables();
			expect(result.length).toBeGreaterThan(3); // テスト実装時はSequelizeMeta + 3テーブルのため、3以上で検証
		}

		await migrationDown();
		// データベースが空っぽなことを確認 - SequelizeMetaのみが存在
		{
			const result = await sequelize.getQueryInterface().showAllTables();
			expect(result).toEqual([
				{
					schema: expect.any(String), // DB名は可変なため無視
					tableName: "SequelizeMeta",
				},
			]);
		}

		// まだ接続されているのでエラーが出ない
		{
			const result = sequelize.query("SELECT 1");
			await expect(result).resolves.toBeTruthy();
		}

		// 接続を切る
		await closeDatabase();

		// 接続を切った後は接続できないことを確認
		{
			const result = sequelize.query("SELECT 1");
			await expect(result).rejects.toThrow();
		}

		await dropDatabase(sequelize);
	});
}
