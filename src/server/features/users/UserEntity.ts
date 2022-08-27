import { generateUuid } from "libs/utils";
import { Entity } from "common/entity";
import { UserModel } from "common/models/UserModel";

type PropertiesEssential = {
	email: string;
}

type Properties = PropertiesEssential & {
	id?: number;
	uuid: string;
	createdAt: number;
	deletedAt: number | null;
}

export class UserEntity extends Entity<Properties> {

	static factory(properties: PropertiesEssential): UserEntity {
		return new UserEntity({
			email: properties.email,
			uuid: generateUuid(),
			createdAt: Date.now(),
			deletedAt: null,
		});
	}

	static fromModel(model: UserModel): UserEntity {
		return new UserEntity({
			id: model.id,
			uuid: model.uuid,
			email: model.email,
			createdAt: model.createdAt,
			deletedAt: model.deletedAt,
		});
	}

	get id(): number {
		return this.getPropertiyOrRaiseIfUndefined(this.properties.id);
	}

	get uuid(): string {
		return this.properties.uuid;
	}

	get email(): string {
		return this.properties.email;
	}

	get createdAt(): number {
		return this.properties.createdAt;
	}

	get deletedAt(): number | null {
		return this.properties.deletedAt;
	}
}
