interface PropertiesCore {
	id?: number;
}

export abstract class Entity<T extends PropertiesCore> {
	protected readonly properties: T;
	protected constructor(properties: T) {
		this.properties = properties;
	}

	getPropertiyOrRaiseIfUndefined<T>(value: T | undefined): T {
		if (value === undefined) {
			throw new Error("value is not set");
		}
		return value;
	}
}
