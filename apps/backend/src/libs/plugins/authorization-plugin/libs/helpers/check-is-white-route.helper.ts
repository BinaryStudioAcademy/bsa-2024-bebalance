const checkIsWhiteRoute = (url: string, whiteRoutes: string[]): boolean => {
	const regex = /^\/api\/v\d+(\/.+)$/;
	const match = url.match(regex);
	const [, route] = match ?? [];

	if (!route) {
		return true;
	}

	return whiteRoutes.includes(route);
};

export { checkIsWhiteRoute };
