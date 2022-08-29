import { v4 } from "uuid";

/**
 * generate UUID
 * @returns UUID
 */
export function generateUuid(): string {
	return v4();
}
