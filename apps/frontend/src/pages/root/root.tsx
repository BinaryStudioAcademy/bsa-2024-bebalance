import { ZERO_INDEX } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector, useEffect, useNavigate } from "~/libs/hooks/hooks.js";

import { UserWheel } from "./components/components.js";

const Root: React.FC = () => {
	const navigate = useNavigate();
	const { quizAnswers } = useAppSelector(({ auth }) => ({
		quizAnswers: auth.user?.quizAnswers,
	}));

	const hasQuizAnswers = quizAnswers && quizAnswers.length > ZERO_INDEX;

	useEffect(() => {
		if (!hasQuizAnswers) {
			navigate(AppRoute.QUIZ);
		}
	}, [hasQuizAnswers, navigate]);

	return <UserWheel />;
};

export { Root };
