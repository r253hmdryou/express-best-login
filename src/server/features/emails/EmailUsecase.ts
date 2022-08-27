import nodemailer, { SendMailOptions } from "nodemailer";
import { UserEntity } from "features/users/UserEntity";
import { config } from "libs/config";
import { AppError } from "libs/error/AppError";
import { errorMessages } from "libs/error/messages";

interface MailaddressRequiredSendMailOptions extends SendMailOptions
{
	to: string;
	from: string;
}

const transporter = nodemailer.createTransport(config.mail.transporter);

/**
 * send email to user to confirm email to create user
 * @param user user
 * @returns void
 */
export function sendConfirmToCreateUser(user: UserEntity): void {
	const email = user.email;
	if(email === null) {
		AppError.raise(errorMessages.general.internalServerError);
	}

	sendCore({
		to: email,
		from: config.mail.from,
		subject: "Confirm email to create user",
		text: `Please confirm your email to create user.` +
			`Your id is ${user.uuid}.`,
	});

}

/**
 * send email core
 * @param options options
 * @returns void
 */
function sendCore(options: MailaddressRequiredSendMailOptions): void {
	if(shouldIgnore(options.to)) {
		return;
	}
	transporter.sendMail(options, (error, info) => {
		console.log(error, info);
	});
}

/**
 * should ignore
 * @param email email
 * @returns true if should ignore
 */
function shouldIgnore(email: string): boolean {
	if(email.includes("@example.com")) {
		return true;
	}
	return false;
}
