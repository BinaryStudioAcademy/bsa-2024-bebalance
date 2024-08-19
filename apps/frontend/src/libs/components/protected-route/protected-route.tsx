import { Navigate } from "react-router-dom";
import { ValueOf } from "shared";

import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

type Properties = {
	component: React.ReactNode;
	redirectTo: ValueOf<typeof AppRoute>;
};

const ProtectedRoute: React.FC<Properties> = ({
	component,
	redirectTo,
}: Properties) => {
	const user = useAppSelector(({ auth }) => auth.user);

	if (user) {
		return component;
	}

	return <Navigate replace to={redirectTo} />;
};

export { ProtectedRoute };
