const ConfirmPasswordCustomValidation = {
	ERROR_MESSAGE: "Passwords do not match. Please re-enter your password",
	ERROR_TYPE: "custom",
	FIELDS: {
		confirmNewPassword: "confirmNewPassword",
		confirmPassword: "confirmPassword",
	},
} as const;

export { ConfirmPasswordCustomValidation };
