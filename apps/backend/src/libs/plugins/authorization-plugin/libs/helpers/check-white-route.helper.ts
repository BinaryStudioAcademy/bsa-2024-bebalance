const checkWhiteRoute = (route: string, whiteRoutes: string[]): boolean => {
	return whiteRoutes.some((whiteRoute) => {
		const regex = new RegExp(`^/api.*${whiteRoute}$`);

		return regex.test(route);
	});
};

export { checkWhiteRoute };
