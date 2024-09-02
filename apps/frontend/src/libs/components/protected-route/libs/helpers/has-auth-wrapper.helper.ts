import { routesWithoutAuthWrapper } from "../constants/constants.js";

function hasAuthWrapper(pathname: string): boolean {
	return !routesWithoutAuthWrapper.includes(pathname);
}

export { hasAuthWrapper };
