const checkIsWhiteRoute = (url: string, whiteRoutes: string[]): boolean => {
	const urlRegex = /^\/api\/v\d+.*(\/.+)$/;
	const match = url.match(urlRegex);

	if (!match) {
		return false;
	}

	const [, route] = match;

	return whiteRoutes.includes(route ?? "/");
};

export { checkIsWhiteRoute };
