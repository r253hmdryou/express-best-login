export interface Error {
	code: string;
	message: string;
	errors?: Error[];
}
