export const config = {
	db: {
		host: getDbHost(),
		port: getDbPort(),
		database: getDbName(),
		user: getDbUser(),
		password: getDbPassword(),
		logging: false,
	},
	mail: {
		transporter: getMailTransporter(),
		from: getMailFromAddress(),
	},
	user: {
		password: {
			minLength: 8,
			maxLength: 100,
		},
	},
};

/**
 * get database host
 * @returns database host
 */
function getDbHost(): string {
	if(process.env.DATABASE_HOST === undefined) {
		throw new Error("DATABASE_HOST is not defined");
	}
	return process.env.DATABASE_HOST;
}

/**
 * get database port
 * @returns database port
 */
function getDbPort(): number {
	if(process.env.DATABASE_PORT === undefined) {
		throw new Error("DATABASE_PORT is not defined");
	}
	return parseInt(process.env.DATABASE_PORT, 10);
}

/**
 * get database name
 * @returns database name
 */
function getDbName(): string {
	// テスト用のデータベース名
	if(process.env.JEST_WORKER_ID !== undefined) {
		return `test_${process.env.JEST_WORKER_ID}`;
	}
	if(process.env.DATABASE === undefined) {
		throw new Error("DATABASE is not defined");
	}
	return process.env.DATABASE;
}

/**
 * get database user
 * @returns database user
 */
function getDbUser(): string {
	if(process.env.DATABASE_USER === undefined) {
		throw new Error("DATABASE_USER is not defined");
	}
	return process.env.DATABASE_USER;
}

/**
 * get database password
 * @returns database password
 */
function getDbPassword(): string {
	if(process.env.DATABASE_PASS === undefined) {
		throw new Error("DATABASE_PASS is not defined");
	}
	return process.env.DATABASE_PASS;
}

/**
 * get mail transporter
 * @returns mail transporter
 */
function getMailTransporter(): string {
	if(process.env.MAIL_TRANSPORTER === undefined) {
		throw new Error("MAIL_TRANSPORTER is not defined");
	}
	return process.env.MAIL_TRANSPORTER;
}

/**
 * get mail from address
 * @returns mail from address
 */
function getMailFromAddress(): string {
	if(process.env.MAIL_FROM === undefined) {
		throw new Error("MAIL_FROM is not defined");
	}
	return process.env.MAIL_FROM;
}
