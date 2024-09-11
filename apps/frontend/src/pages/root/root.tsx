import { Navigate } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { UserWheel } from "./components/components.js";

const ZERO = 0;

const Root: React.FC = () => {
	const { onboardingAnswers } = useAppSelector(({ auth }) => ({
		onboardingAnswers: auth.user?.onboardingAnswers,
	}));

	const hasOnboardingAnswers =
		onboardingAnswers && onboardingAnswers.length > ZERO;

	if (!hasOnboardingAnswers) {
		return <Navigate replace to={AppRoute.QUIZ} />;
	}

	return <UserWheel />;
};

export { Root };
