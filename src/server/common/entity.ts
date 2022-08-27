interface PropertiesCore {
	id?: number;
	isNewRecord?: boolean;
}

export abstract class Entity<T extends PropertiesCore> {
	protected readonly properties: T;
	protected constructor(properties: T) {
		this.properties = {
			...properties,
			isNewRecord: properties.id === undefined,
		};
	}

	getPropertiyOrRaiseIfUndefined<T>(value: T | undefined): T {
		if (value === undefined) {
			throw new Error("value is not set");
		}
		return value;
	}

	get isNewRecord(): boolean {
		return this.getPropertiyOrRaiseIfUndefined(this.properties.isNewRecord);
	}
}
