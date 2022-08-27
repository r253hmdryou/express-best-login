import { Error } from "types/error";

type ErrorMessage = {
	status?: STATUS
	code: string;
	message: string;
}

export const enum STATUS
{
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	CONFLICT = 409,
	INTERNAL_SERVER_ERROR = 500,
}

export class AppError {
	private errorMessage: ErrorMessage;
	private status?: STATUS;
	private errors?: AppError[];

	constructor(errorMessage: ErrorMessage) {
		this.errorMessage = errorMessage;
		this.status = errorMessage.status;
	}

	static raise(errorMessage: ErrorMessage): never {
		throw new AppError(errorMessage);
	}

	static factory(errorMessage: ErrorMessage): AppError {
		return new AppError(errorMessage);
	}

	getStatus(): STATUS {
		if(this.status === undefined) {
			return STATUS.INTERNAL_SERVER_ERROR;
		}
		return this.status;
	}

	getApiResponseBody(): Error {
		return {
			code: this.errorMessage.code,
			message: this.errorMessage.message,
			errors: this.getErrors(),
		};
	}

	addError(errorMessage: ErrorMessage): void {
		if(this.errors === undefined) {
			this.errors = [];
		}
		if(this.status === undefined) {
			this.status = errorMessage.status;
		} else if(errorMessage.status !== undefined && errorMessage.status < this.status) {
			this.status = errorMessage.status;
		}
		this.errors.push(new AppError(errorMessage));
	}

	raiseIfError(): void {
		if(this.errors !== undefined) {
			throw this;
		}
	}

	private getErrors(): Error[] | undefined {
		if(this.errors === undefined) {
			return undefined;
		}
		return this.errors.map((error): Error => {
			return {
				code: error.getCode(),
				message: error.getMessage(),
			};
		});
	}

	getCode(): string {
		return this.errorMessage.code;
	}

	getMessage(): string {
		return this.errorMessage.message;
	}
}
