import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector, useEffect, useNavigate } from "~/libs/hooks/hooks.js";

import { UserWheel } from "./components/components.js";

const Root: React.FC = () => {
	const navigate = useNavigate();
	const { hasAnsweredQuizQuestions } = useAppSelector(({ auth }) => ({
		hasAnsweredQuizQuestions: auth.user?.hasAnsweredQuizQuestions,
	}));

	useEffect(() => {
		if (!hasAnsweredQuizQuestions) {
			navigate(AppRoute.QUIZ);
		}
	}, [hasAnsweredQuizQuestions, navigate]);

	return <UserWheel />;
};

export { Root };
