import { Navigate, Outlet } from "react-router-dom";

import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

const ProtectedRoute: React.FC = () => {
	const authStatus = useAppSelector(({ auth }) => auth.dataStatus);

	if (authStatus === DataStatus.FULFILLED) {
		return <Outlet />;
	}

	return <Navigate replace to={AppRoute.SIGN_IN} />;
};

export { ProtectedRoute };
