import { Entity } from "common/entity";
import {UserAccountModel} from "common/models/UserAccountModel";
import {UserModel} from "common/models/UserModel";
import {UserProfileModel} from "common/models/UserProfileModel";
import { generateUuid } from "libs/utils";

type PropertiesEssential = {
	loginId: string;
	password: string;
}

type ChangeAccount = {
	isChangeAccount: true;
	account: UserAccountEntity | null;
}
type NotChangeAccount = {
	isChangeAccount: false;
	account?: UserAccountEntity | null;
}

type Properties = (ChangeAccount | NotChangeAccount) & {
	isNewRecord: boolean;
	id?: number;
	uuid: string;
	createdAt: number;
	deletedAt: number | null;

	isChangeAccount: boolean;
	isChangeProfile: boolean;

	/**
	 * UserProfileModel
	 */
	profile?: UserProfileEntity | null;
}

export class UserEntity extends Entity<Properties> {

	static factory(properties: PropertiesEssential): UserEntity {
		const userAccount = UserAccountEntity.factory({
			...properties,
		});
		if(userAccount === undefined) {
			throw new Error("userAccount is undefined");
		}
		return new UserEntity({
			isNewRecord: true,
			uuid: generateUuid(),
			createdAt: Date.now(),
			deletedAt: null,

			account: userAccount,

			profile: null,

			isChangeAccount: true,
			isChangeProfile: false,
		});
	}

	static fromModel(model: UserModel): UserEntity {
		return new UserEntity({
			isNewRecord: model.isNewRecord,
			id: model.id,
			uuid: model.uuid,
			createdAt: model.createdAt,
			deletedAt: model.deletedAt,

			isChangeAccount: false,
			isChangeProfile: false,

			account: UserAccountEntity.fromModel(model.account),
			profile: UserProfileEntity.fromModel(model.profile),
		});
	}

	get isNewRecord(): boolean {
		return this.properties.isNewRecord;
	}

	get id(): number {
		return this.getPropertiyOrRaiseIfUndefined(this.properties.id);
	}

	get uuid(): string {
		return this.getPropertiyOrRaiseIfUndefined(this.properties.uuid);
	}

	get createdAt(): number {
		return this.properties.createdAt;
	}

	// ----- UserAccountsModel ----- //

	get account(): UserAccountEntity | null | undefined {
		return this.properties.account;
	}

	get isChangeAccount(): boolean {
		return this.properties.isChangeAccount;
	}

	// ----- UserProfileModel ----- //

	get profile(): UserProfileEntity | null | undefined {
		return this.properties.profile;
	}

	get isChangeProfile(): boolean {
		return this.properties.isChangeProfile;
	}

	get email(): string | null {
		const profile = this.getPropertiyOrRaiseIfUndefined(this.profile);
		if(profile === null) {
			return null;
		}
		return profile.email;
	}

	set email(email: string | null) {
		const profile = this.getPropertiyOrRaiseIfUndefined(this.properties.profile);
		this.properties.isChangeProfile = true;
		if(profile === null) {
			this.properties.profile = UserProfileEntity.factory({
				email: email,
			});
		} else {
			profile.email = email;
		}
	}

}

// ----- UserAccountEntity ----- //

interface PropertiesEssentialAccount {
	loginId: string;
	password: string;
}

interface NewRecordPropertiesAccount extends PropertiesEssentialAccount {
	isNewRecord: true,
	id: undefined,
}
interface ExistingRecordPropertiesAccount extends PropertiesEssentialAccount {
	isNewRecord: false,
	id: number,
}
type PropertiesAccount = NewRecordPropertiesAccount | ExistingRecordPropertiesAccount;

export class UserAccountEntity extends Entity<PropertiesAccount> {

	static factory(account: PropertiesEssentialAccount | null | undefined): UserAccountEntity | null | undefined {
		if(account === undefined){
			return undefined;
		}
		if(account === null) {
			return null;
		}
		return new UserAccountEntity({
			...account,
			isNewRecord: true,
			id: undefined,
		});
	}

	static fromModel(model?: UserAccountModel | null): UserAccountEntity | null | undefined {
		if(model === null){
			return null;
		}
		if(model === undefined){
			return undefined;
		}
		if(model.isNewRecord) {
			return new UserAccountEntity({
				isNewRecord: true,
				id: undefined,
				loginId: model.loginId,
				password: model.password,
			});
		}
		return new UserAccountEntity({
			isNewRecord: false,
			id: model.id,
			loginId: model.loginId,
			password: model.password,
		});
	}

	get isNewRecord(): boolean {
		return this.properties.isNewRecord;
	}

	get id(): number {
		return this.getPropertiyOrRaiseIfUndefined(this.properties.id);
	}

	get loginId(): string {
		return this.properties.loginId;
	}

	get password(): string {
		return this.properties.password;
	}
}

// ----- UserProfileEntity ----- //

interface PropertiesEssentialProfile {
	firstName?: string | null;
	lastName?: string | null;
	middleName?: string | null;
	firstNameKana?: string | null;
	lastNameKana?: string | null;
	middleNameKana?: string | null;
	email?: string | null;
}

interface NewRecordPropertiesProfile extends Required<PropertiesEssentialProfile> {
	isNewRecord: true;
	id: undefined;
}
interface ExistingRecordPropertiesProfile extends Required<PropertiesEssentialProfile> {
	isNewRecord: false;
	id: number;
}
type PropertiesProfile = NewRecordPropertiesProfile | ExistingRecordPropertiesProfile;

export class UserProfileEntity extends Entity<PropertiesProfile> {

	static factory(profile: PropertiesEssentialProfile | null | undefined): UserProfileEntity | null | undefined {
		if(profile === null){
			return null;
		}
		if(profile === undefined){
			return undefined;
		}
		const defaultProperties: Required<PropertiesEssentialProfile> = {
			firstName: null,
			lastName: null,
			middleName: null,
			firstNameKana: null,
			lastNameKana: null,
			middleNameKana: null,
			email: null,
		};
		return new UserProfileEntity({
			...defaultProperties,
			...profile,
			isNewRecord: true,
			id: undefined,
		});
	}

	static fromModel(model?: UserProfileModel | null): UserProfileEntity | null | undefined {
		if(model === null){
			return null;
		}
		if(model === undefined){
			return undefined;
		}
		if(model.isNewRecord) {
			return new UserProfileEntity({
				isNewRecord: true,
				id: undefined,
				firstName: model.firstName,
				lastName: model.lastName,
				middleName: model.middleName,
				firstNameKana: model.firstNameKana,
				lastNameKana: model.lastNameKana,
				middleNameKana: model.middleNameKana,
				email: model.email,
			});
		}
		return new UserProfileEntity({
			isNewRecord: false,
			id: model.id,
			firstName: model.firstName,
			lastName: model.lastName,
			middleName: model.middleName,
			firstNameKana: model.firstNameKana,
			lastNameKana: model.lastNameKana,
			middleNameKana: model.middleNameKana,
			email: model.email,
		});
	}

	get isNewRecord(): boolean {
		return this.properties.isNewRecord;
	}

	get id(): number {
		return this.getPropertiyOrRaiseIfUndefined(this.properties.id);
	}

	get firstName(): string | null {
		return this.properties.firstName;
	}

	get lastName(): string | null {
		return this.properties.lastName;
	}

	get middleName(): string | null {
		return this.properties.middleName;
	}

	get firstNameKana(): string | null {
		return this.properties.firstNameKana;
	}

	get lastNameKana(): string | null {
		return this.properties.lastNameKana;
	}

	get middleNameKana(): string | null {
		return this.properties.middleNameKana;
	}

	get email(): string | null {
		return this.properties.email;
	}

	set email(email: string | null) {
		this.properties.email = email;
	}
}
