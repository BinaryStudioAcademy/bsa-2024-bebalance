function createResetPasswordEmail({
	link,
	username,
}: {
	link: string;
	username: string;
}): string {
	return `We’ve received a request to reset your password.
Dear ${username}, please, follow the link to set up a new password: ${link}
The link expires in 30 minutes for security purposes.
If you have not requested a password reset, kindly ignore this email.`;
}

export { createResetPasswordEmail };
