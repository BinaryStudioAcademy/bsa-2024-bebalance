const ConfirmPasswordCustomValidation = {
	ERROR_MESSAGE: "Passwords do not match. Please re-enter your password",
	ERROR_TYPE: "custom",
	FIELD: {
		CONFIRM_NEW_PASSWORD: "confirmNewPassword",
		CONFIRM_PASSWORD: "confirmPassword",
	},
} as const;

export { ConfirmPasswordCustomValidation };
