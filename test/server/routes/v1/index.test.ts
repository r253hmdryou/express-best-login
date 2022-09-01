import request from "supertest";
import app from "app";

{
	describe("Hello World", testHelloWorld);
}

/**
 * Hello World
 * @returns void
 */
function testHelloWorld(): void {
	test("Hello World", async() => {
		{
			const response = await request(app)
				.get(`/v1/hello`)
				.set("X-Requested-With", "test");

			expect(response.status).toEqual(200);
			expect(response.body).toEqual("Hello World!!");
		}
	});
}
