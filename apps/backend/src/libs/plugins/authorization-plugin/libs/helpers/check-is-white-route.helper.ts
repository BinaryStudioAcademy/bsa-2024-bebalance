const checkIsWhiteRoute = (url: string, whiteRoutes: string[]): boolean => {
	const macthServerUrlRegex = /^\/api\/v\d+.*(\/.+)$/;
	const result = url.match(macthServerUrlRegex);

	if (!result) {
		return true;
	}

	const [, route] = result;

	return whiteRoutes.includes(route ?? "/");
};

export { checkIsWhiteRoute };
