import { UserAccountModel } from "common/models/UserAccountModel";
import { UserModel } from "common/models/UserModel";
import { UserProfileModel } from "common/models/UserProfileModel";
import { UserAccountEntity, UserEntity, UserProfileEntity } from "features/users/userEntity";

describe("UserEntity", testUserEntity);
describe("UserAccountEntity", testUserAccountEntity);
describe("UserProfileEntity", testUserProfileEntity);

/**
 * UserEntity
 * @returns void
 */
function testUserEntity(): void {
	test("定義されていないプロパティにアクセスしようとするとエラー", () => {
		const user = UserEntity.factory({
			loginId: "alice",
			password: "password",
		});

		expect(() => {
			user.id;
		}).toThrow();
	});

	test("UserModel単体からEntityを生成した場合、他Entityはundefined", () => {
		const userModel = new UserModel();
		userModel.createdAt = Date.now();
		userModel.uuid = "2a12bbf4-1260-4840-b1c3-2443221b6dca";

		const user = UserEntity.fromModel(userModel);

		expect(user.account).toBeUndefined();
		expect(user.profile).toBeUndefined();
	});
}

/**
 * UserAccountEntity
 * @returns void
 */
function testUserAccountEntity(): void {
	test("null/undefinedはそのまま返ってくる", () => {
		{
			const userAccount = UserAccountEntity.factory(null);
			expect(userAccount).toBeNull();
		}
		{
			const userAccount = UserAccountEntity.factory(undefined);
			expect(userAccount).toBeUndefined();
		}

		{
			const userAccount = UserAccountEntity.fromModel(null);
			expect(userAccount).toBeNull();
		}
		{
			const userAccount = UserAccountEntity.fromModel(undefined);
			expect(userAccount).toBeUndefined();
		}
	});

	test("定義されていないプロパティにアクセスしようとするとエラー", () => {
		{
			const userAccountModel = new UserAccountModel();
			userAccountModel.loginId = "alice";
			userAccountModel.password = "password";

			const userAccount = UserAccountEntity.fromModel(userAccountModel);

			expect(userAccount).not.toBeNull();
			expect(userAccount).not.toBeUndefined();
			if(userAccount === null || userAccount === undefined) {
				throw "error";
			}

			expect(() => {
				userAccount.id;
			}).toThrow();
		}
	});
}

/**
 * UserProfileEntity
 * @returns void
 */
function testUserProfileEntity(): void {
	test("null/undefinedはそのまま返ってくる", () => {
		{
			const userProfile = UserProfileEntity.factory(null);
			expect(userProfile).toBeNull();
		}
		{
			const userProfile = UserProfileEntity.factory(undefined);
			expect(userProfile).toBeUndefined();
		}
		{
			const userProfile = UserProfileEntity.fromModel(null);
			expect(userProfile).toBeNull();
		}
		{
			const userProfile = UserProfileEntity.fromModel(undefined);
			expect(userProfile).toBeUndefined();
		}
	});

	test("定義されていないプロパティにアクセスしようとするとエラー", () => {
		{
			const userProfileModel = new UserProfileModel();

			const userProfile = UserProfileEntity.fromModel(userProfileModel);

			expect(userProfile).not.toBeNull();
			expect(userProfile).not.toBeUndefined();
			if(userProfile === null || userProfile === undefined) {
				throw "error";
			}

			expect(() => {
				userProfile.id;
			}).toThrow();
		}
	});

	test("デフォルト値はすべてNULL", () => {
		const userProfile = UserProfileEntity.factory({});

		if(userProfile === null || userProfile === undefined) {
			throw "error";
		}
		expect(userProfile.firstName).toBeNull();
		expect(userProfile.lastName).toBeNull();
		expect(userProfile.middleName).toBeNull();
		expect(userProfile.firstNameKana).toBeNull();
		expect(userProfile.lastNameKana).toBeNull();
		expect(userProfile.middleNameKana).toBeNull();
		expect(userProfile.email).toBeNull();
	});
}
