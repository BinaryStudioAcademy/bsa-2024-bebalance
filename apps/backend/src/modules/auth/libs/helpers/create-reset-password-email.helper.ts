function createResetPasswordEmail({
	link,
	username,
}: {
	link: string;
	username: string;
}): string {
	return `
<p>We’ve received a request to reset your password.</p>
<p>Dear ${username}, please follow the link to set up a new password: <a href="${link}">click here to reset your password</a></p>
<p><strong>The link expires in 30 minutes for security purposes.</strong></p>
<p>If you have not requested a password reset, kindly ignore this email.</p>
`;
}

export { createResetPasswordEmail };
