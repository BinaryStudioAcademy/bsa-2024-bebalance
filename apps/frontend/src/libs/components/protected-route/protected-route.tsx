import { Navigate } from "~/libs/components/components.js";
import { type AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector, useLocation } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";

import { AuthWrapper } from "../auth-wrapper/auth-wrapper.js";
import { routesWithAuthHeader } from "./libs/constants/routes-with-auth-header.constant.js";

type Properties = {
	component: React.ReactNode;
	redirectTo: ValueOf<typeof AppRoute>;
};

const ProtectedRoute: React.FC<Properties> = ({
	component,
	redirectTo,
}: Properties) => {
	const user = useAppSelector(({ auth }) => auth.user);

	const { pathname } = useLocation();

	if (user && routesWithAuthHeader.includes(pathname)) {
		return <AuthWrapper>{component}</AuthWrapper>;
	}

	if (user) {
		return component;
	}

	return <Navigate replace to={redirectTo} />;
};

export { ProtectedRoute };
