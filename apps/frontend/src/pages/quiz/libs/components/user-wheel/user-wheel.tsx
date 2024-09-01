import { useAppDispatch, useEffect } from "~/libs/hooks/hooks.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

const UserWheel: React.FC = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		void dispatch(quizActions.getScores());
	}, [dispatch]);

	return <>User wheel</>;
};

export { UserWheel };
