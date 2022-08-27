import request from "supertest";
import app from "app";
import { createInMemoryDatabase, dropDatabase } from "../../../libs/sequelize";

{
	initialize();

	describe("test about user", testUsers);
}

/**
 * initialize
 * @returns void
 */
function initialize(): void {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let sequelize: any = null;
	beforeAll(async() => {
		sequelize = await createInMemoryDatabase();
	});
	afterAll(async() => {
		await dropDatabase(sequelize);
	});
}

/**
 * test about user
 * @returns void
 */
function testUsers(): void {
	test("create user", async() => {
		let userId = "";
		// ユーザーを作成
		{
			const response = await request(app)
				.post("/v1/users")
				.send({
					loginId: "alice",
					password: "password",
				});

			expect(response.status).toEqual(201);
			expect(response.body).toEqual({
				id: expect.any(String),
				email: null,
			});
			userId = response.body.id;
		}

		// ユーザー一覧を取得
		{
			const response = await request(app)
				.get("/v1/users");

			expect(response.status).toEqual(200);
			expect(response.body.users).toHaveLength(1);
			expect(response.body).toEqual({
				count: 1,
				users: [
					{
						id: expect.any(String),
						email: null,
					},
				],
			});
		}

		// ユーザーを取得
		{
			const response = await request(app)
				.get(`/v1/users/${userId}`);

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(
				{
					id: expect.any(String),
					email: null,
				},
			);
		}

		// ユーザーを変更 - メールアドレスを変更
		{
			const response = await request(app)
				.put(`/v1/users/${userId}`)
				.send({
					email: "test@example.com",
				});

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(
				{
					id: expect.any(String),
					email: "test@example.com",
				},
			);
		}

		// ユーザーを取得 - メールアドレスが変更されていることを確認
		{
			const response = await request(app)
				.get(`/v1/users/${userId}`);

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(
				{
					id: expect.any(String),
					email: "test@example.com",
				},
			);
		}

		// ユーザーを変更 - 同一のメールアドレスを指定してもエラーが出ない
		{
			const response = await request(app)
				.put(`/v1/users/${userId}`)
				.send({
					email: "test@example.com",
				});

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(
				{
					id: expect.any(String),
					email: "test@example.com",
				},
			);
		}

		// ユーザーを取得 - 何も変わっていない
		{
			const response = await request(app)
				.get(`/v1/users/${userId}`);

			expect(response.status).toEqual(200);
			expect(response.body).toEqual(
				{
					id: expect.any(String),
					email: "test@example.com",
				},
			);
		}
	});

	test("failed to create user", async() => {
		// パラメーター未送信
		{
			const response = await request(app)
				.post("/v1/users")
				.send({
					// loginId: "alice",
					// password: "password",
				});

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				code: "failedToCreateUser",
				message: "Failed to create user",
				errors: [
					{
						code: "userLoginIdInvalid",
						message: "invalid loginId",
					},
					{
						code: "userPasswordInvalid",
						message: "invalid password",
					},
				],
			});
		}

		// loginIdは250文字以内、パスワードは8文字以上
		{
			const response = await request(app)
				.post("/v1/users")
				.send({
					loginId: "a".repeat(251),
					password: "pass",
				});

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				code: "failedToCreateUser",
				message: "Failed to create user",
				errors: [
					{
						code: "userLoginIdMaxLength",
						message: "loginId must be less than 250 characters",
					},
					{
						code: "userPasswordMinLength",
						message: "password must be at least 8 characters",
					},
				],
			});
		}

		// 同一のログインIDでは作成できない
		{
			const response = await request(app)
				.post("/v1/users")
				.send({
					loginId: "alice",
					password: "password",
				});

			expect(response.status).toEqual(409);
			expect(response.body).toEqual({
				code: "failedToCreateUser",
				message: "Failed to create user",
				errors: [
					{
						code: "userLoginIdDuplication",
						message: "loginId already exists: alice",
					},
				],
			});
		}

		let userId = "";
		// ユーザーを作成 - 新たなユーザーを作り・・・
		{
			const response = await request(app)
				.post("/v1/users")
				.send({
					loginId: "bob",
					password: "password",
				});

			expect(response.status).toEqual(201);
			userId = response.body.id;
		}

		// ユーザーを変更 - メールアドレスの形式がおかしいと登録できない
		{
			const response = await request(app)
				.put(`/v1/users/${userId}`)
				.send({
					email: "testexample.com", // @が無い
				});

			expect(response.status).toEqual(400);
			expect(response.body).toEqual(
				{
					code: "failedToUpdateUser",
					message: "Failed to update user",
					errors: [
						{
							code: "userEmailInvalidPattern",
							message: "invalid email pattern",
						},
					],
				},
			);
		}

		// ユーザーを変更 - パラメーター未送信
		{
			const response = await request(app)
				.put(`/v1/users/${userId}`)
				.send({
					// email: "test@example.com",
				});

			expect(response.status).toEqual(400);
			expect(response.body).toEqual(
				{
					code: "failedToUpdateUser",
					message: "Failed to update user",
					errors: [
						{
							code: "userEmailInvalid",
							message: "invalid email",
						},
					],
				},
			);
		}
	});

	test("failed to get user", async() => {
		// UUIDの形式でなければ404 (validatorで弾かれる)
		{
			const response = await request(app)
				.get("/v1/users/iddd");

			expect(response.status).toEqual(404);
			expect(response.body).toEqual({
				code: "userNotFound",
				message: "User not found: iddd",
			});
		}

		// 存在しないUUIDであれば404 (usecaseで弾かれる)
		{
			const response = await request(app)
				.get("/v1/users/827f2c8f-8c2f-4437-bda5-8d1b8930d5e5");

			expect(response.status).toEqual(404);
			expect(response.body).toEqual({
				code: "userNotFound",
				message: "User not found: 827f2c8f-8c2f-4437-bda5-8d1b8930d5e5",
			});
		}
	});
}
