import { UserAccountModel } from "./UserAccountModel";
import { UserModel } from "./UserModel";
import { UserProfileModel } from "./UserProfileModel";

/**
 * initialize scope
 * @returns void
 */
export function initScope(): void {
	UserModel.addScope("withAccount", {
		include: [
			{
				model: UserAccountModel,
				as: "account",
				required: false,
			},
		],
	});

	UserModel.addScope("withProfile", {
		include: [
			{
				model: UserProfileModel,
				as: "profile",
				required: false,
			},
		],
	});
}
