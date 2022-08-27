import { v4 } from "uuid";

/**
 * UUIDを生成する
 * @returns UUID
 */
export function generateUuid(): string {
	return v4();
}
