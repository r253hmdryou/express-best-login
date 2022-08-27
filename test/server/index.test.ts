import request from "supertest";
import app from "app";

{
	describe("error handling", testError);
}

/**
 * error handling
 * @returns void
 */
function testError(): void {
	test("error handling", async() => {
		// 404 not found
		{
			const response = await request(app)
				.get(`/`);

			expect(response.status).toEqual(404);
			expect(response.body).toEqual({
				code: "apiNotFound",
				message: "API Not Found. Please check the URL.",
			});
		}
	});
}
