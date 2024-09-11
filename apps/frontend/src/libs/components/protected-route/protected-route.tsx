import { Loader, Navigate } from "~/libs/components/components.js";
import { type AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { useAppSelector, useLocation } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";

import { AuthWrapper } from "../auth-wrapper/auth-wrapper.js";
import { checkHasAuthWrapper } from "./libs/helpers/helpers.js";

type Properties = {
	component: React.ReactNode;
	redirectTo: ValueOf<typeof AppRoute>;
};

const ProtectedRoute: React.FC<Properties> = ({
	component,
	redirectTo,
}: Properties) => {
	const { dataStatus, user } = useAppSelector(({ auth }) => auth);

	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	const { pathname } = useLocation();

	if (isLoading) {
		return <Loader />;
	}

	if (!user) {
		return <Navigate replace to={redirectTo} />;
	}

	if (checkHasAuthWrapper(pathname as ValueOf<typeof AppRoute>)) {
		return <AuthWrapper>{component}</AuthWrapper>;
	}

	return component;
};

export { ProtectedRoute };
