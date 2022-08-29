import request from "supertest";
import app from "app";

{
	describe("error", testError);
}

/**
 * error
 * @returns void
 */
function testError(): void {
	test("error handling", async() => {
		// 404 not found
		{
			const response = await request(app)
				.get(`/`)
				.set("X-Requested-With", "test");

			expect(response.status).toEqual(404);
			expect(response.body).toEqual({
				code: "apiNotFound",
				message: "API Not Found. Please check the URL.",
			});
		}
	});

	test("required header", async() => {
		// X-Requested-With
		{
			const response = await request(app)
				.get(`/hello`);
				// .set("X-Requested-With", "test");

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				code: "apiHeaderRequired",
				message: "required header is missing, please set X-Requested-With",
			});
		}
	});
}
