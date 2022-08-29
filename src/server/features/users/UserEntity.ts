import argon2 from "argon2";
import { generateUuid } from "libs/utils";
import { Entity } from "common/entity";
import { UserModel } from "common/models/UserModel";

type PropertiesEssential = {
	readonly email: string;
}

type Properties = {
	readonly id?: number;
	readonly uuid: string;
	email: string | null;
	password: string | null;
	readonly createdAt: number;
	deletedAt: number | null;
}

export class UserEntity extends Entity<Properties> {

	static factory(properties: PropertiesEssential): UserEntity {
		return new UserEntity({
			uuid: generateUuid(),
			email: properties.email,
			password: null,
			createdAt: Date.now(),
			deletedAt: null,
		});
	}

	static fromModel(model: UserModel): UserEntity {
		return new UserEntity({
			id: model.id,
			uuid: model.uuid,
			email: model.email,
			password: model.password,
			createdAt: model.createdAt,
			deletedAt: model.deletedAt,
		});
	}

	isAvailable(): boolean {
		if(this.properties.deletedAt !== null) {
			return false;
		}
		if(this.properties.email === null) {
			return false;
		}
		return true;
	}

	get id(): number {
		return this.getPropertiyOrRaiseIfUndefined(this.properties.id);
	}

	get uuid(): string {
		return this.properties.uuid;
	}

	get email(): string | null {
		return this.properties.email;
	}

	async setPassword(password: string): Promise<void> {
		this.properties.password = await argon2.hash(password);
	}

	get password(): string | null {
		return this.properties.password;
	}

	async verifyPassword(password: string): Promise<boolean> {
		if(this.properties.password === null){
			return false;
		}
		return await argon2.verify(this.properties.password, password);
	}

	isSignedUp(): boolean {
		return this.properties.password !== null;
	}

	get createdAt(): number {
		return this.properties.createdAt;
	}

	get deletedAt(): number | null {
		return this.properties.deletedAt;
	}
}
