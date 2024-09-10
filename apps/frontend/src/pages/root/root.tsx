import { Navigate } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { UserWheel } from "./components/components.js";

const ZERO = 0;

const Root: React.FC = () => {
	const { userAnswers } = useAppSelector(({ onboarding }) => ({
		userAnswers: onboarding.userAnswers,
	}));

	const hasOnboardingAnswers = userAnswers.length > ZERO;

	if (!hasOnboardingAnswers) {
		return <Navigate replace to={AppRoute.QUIZ} />;
	}

	return <UserWheel />;
};

export { Root };
