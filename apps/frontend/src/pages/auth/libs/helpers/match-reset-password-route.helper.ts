const matchResetPasswordRoute = (path: string): boolean => {
	return /^\/reset-password\/[^/]+$/.test(path);
};

export { matchResetPasswordRoute };
