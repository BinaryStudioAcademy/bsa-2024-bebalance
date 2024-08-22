const checkIsWhiteRoute = (url: string, whiteRoutes: string[]): boolean => {
	const matchServerUrlRegex = /^\/api\/v\d+.*(\/.+)$/;
	const result = url.match(matchServerUrlRegex);

	if (!result) {
		return true;
	}

	const [, route] = result;

	return whiteRoutes.includes(route ?? "/");
};

export { checkIsWhiteRoute };
