import request from "supertest";
import app from "app";

import { createInMemoryDatabase, dropDatabase } from "@test/libs/sequelize";
import { UserModel } from "common/models/UserModel";

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
			const models = await UserModel.findAll();
			expect(models.length).toEqual(1);
			expect(models[0].email).toEqual("test@example.com");
			expect(models[0].password).toBeNull();
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

		let userId = "";
		// check database directly - not changed
		{
			const models = await UserModel.findAll();
			expect(models.length).toEqual(1);
			expect(models[0].email).toEqual("test@example.com");
			expect(models[0].password).toBeNull();
			userId = models[0].uuid;
		}

		// signup
		{
			const response = await request(app)
				.post(`/v1/users/${userId}`)
				.send({
					password: "password",
				});

			expect(response.status).toEqual(201);
			expect(response.body).toEqual({
				id: userId,
				email: "test@example.com",
			});
		}

		// check database directly - password set
		{
			const models = await UserModel.findAll();
			expect(models.length).toEqual(1);
			expect(models[0].email).toEqual("test@example.com");
			expect(models[0].password).toMatch("$argon2id$v=19$m=4096,t=3,p=1$");
		}
	});

	test("faild to create user", async() => {
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

		// already signed up
		let userId = "";
		{
			const model = await UserModel.findOne({
				where: {
					email: "test@example.com",
				},
			});
			expect(model).not.toBeNull();
			if(model === null) {
				throw "error";
			}
			expect(model.password).toMatch("$argon2id"); // password set
			userId = model.uuid;
		}
		{
			const response = await request(app)
				.post(`/v1/users/${userId}`)
				.send({
					password: "password",
				});

			expect(response.status).toEqual(403);
			expect(response.body).toEqual({
				code: "userAlreadySignedUp",
				message: "User already signed up",
			});
		}

		// parameter error
		{
			const response = await request(app)
				.post(`/v1/users/${userId}`)
				.send({
					// password: "password",
				});

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				code: "userSignup",
				message: "Failed to signup user",
				errors: [
					{
						code: "invalidUserParamPassword",
						message: "Invalid password",
					},
				],
			});
		}

		// parameter error - min length
		{
			const response = await request(app)
				.post(`/v1/users/${userId}`)
				.send({
					password: "pass",
				});

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				code: "userSignup",
				message: "Failed to signup user",
				errors: [
					{
						code: "invalidUserParamPasswordMinLength",
						message: "Invalid password. Minimum length is 8",
					},
				],
			});
		}

		// parameter error - max length
		{
			const response = await request(app)
				.post(`/v1/users/${userId}`)
				.send({
					password: "a".repeat(101),
				});

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				code: "userSignup",
				message: "Failed to signup user",
				errors: [
					{
						code: "invalidUserParamPasswordMaxLength",
						message: "Invalid password. Maximum length is 100",
					},
				],
			});
		}

		// if 100, okay(error in usecase(403) through validator(400))
		{
			const response = await request(app)
				.post(`/v1/users/${userId}`)
				.send({
					password: "a".repeat(100),
				});

			expect(response.status).toEqual(403);
		}
	});
}
