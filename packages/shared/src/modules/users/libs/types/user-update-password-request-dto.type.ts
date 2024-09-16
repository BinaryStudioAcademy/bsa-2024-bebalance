type UserUpdatePasswordRequestDto = {
	currentPassword: string;
	email: string;
	jwtToken: string;
	newPassword: string;
};

export { type UserUpdatePasswordRequestDto };
