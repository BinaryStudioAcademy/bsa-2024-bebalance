import { Navigate } from "~/libs/components/components.js";
import { type AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";

import { AuthWrapper } from "../auth-wrapper.tsx/auth-wrapper.js";

type Properties = {
	redirectTo: ValueOf<typeof AppRoute>;
};

const ProtectedRoute: React.FC<Properties> = ({ redirectTo }: Properties) => {
	const user = useAppSelector(({ auth }) => auth.user);

	if (user) {
		return <AuthWrapper />;
	}

	return <Navigate replace to={redirectTo} />;
};

export { ProtectedRoute };
