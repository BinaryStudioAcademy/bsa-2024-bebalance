import { Loader, Navigate } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions as appActions } from "~/modules/app/app.js";

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
	const { dataStatus, hasAnsweredQuizQuestions, user } = useAppSelector(
		({ auth }) => ({
			dataStatus: auth.dataStatus,
			hasAnsweredQuizQuestions: auth.user?.hasAnsweredQuizQuestions,
			user: auth.user,
		}),
	);

	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	const { pathname } = useLocation();
	const dispatch = useAppDispatch();

	if (isLoading) {
		return <Loader />;
	}

	if (!user) {
		return <Navigate replace to={redirectTo} />;
	}

	if (!hasAnsweredQuizQuestions && pathname !== AppRoute.QUIZ) {
		dispatch(appActions.changeLink(AppRoute.QUIZ));
	}

	if (checkHasAuthWrapper(pathname as ValueOf<typeof AppRoute>)) {
		return <AuthWrapper>{component}</AuthWrapper>;
	}

	return component;
};

export { ProtectedRoute };
