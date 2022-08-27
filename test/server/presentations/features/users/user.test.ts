import request from "supertest";
import app from "app";

import { createInMemoryDatabase, dropDatabase } from "@test/libs/sequelize";

{
	initialize();

	describe("test about user", testUsers);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let sequelize: any = null;
/**
 * initialize
 * @returns void
 */
function initialize(): void {
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
		// create user request
		{
			const response = await request(app)
				.post(`/v1/users`)
				.send({
					email: "test@example.com",
				});

			// always 201 if email is valid
			expect(response.status).toEqual(201);
		}

		// check database directly
		{
			const models = await sequelize.query("SELECT * FROM users");
			expect(models[0].length).toEqual(1);
			expect(models[0][0].email).toEqual("test@example.com");
		}

		// cannot create same email
		{
			const response = await request(app)
				.post(`/v1/users`)
				.send({
					email: "test@example.com",
				});

			// always 201 if email is valid
			expect(response.status).toEqual(201);
		}

		// check database directly - not changed
		{
			const models = await sequelize.query("SELECT * FROM users");
			expect(models[0].length).toEqual(1);
			expect(models[0][0].email).toEqual("test@example.com");
		}

		// parameter error
		{
			const response = await request(app)
				.post(`/v1/users`)
				.send({
					email: "invalid",
				});

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				code: "userCreate",
				message: "Failed to create user",
				errors: [
					{
						code: "invalidUserParamEmailPattern",
						message: "Invalid email pattern",
					},
				],
			});
		}

		// parameter error
		{
			const response = await request(app)
				.post(`/v1/users`)
				.send({
					// email: "test@example.com",
				});

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				code: "userCreate",
				message: "Failed to create user",
				errors: [
					{
						code: "invalidUserParamEmail",
						message: "Invalid email",
					},
				],
			});
		}
	});
}
