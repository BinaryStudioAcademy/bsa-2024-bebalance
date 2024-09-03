import { BalanceWheelChart } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

const UserWheel: React.FC = () => {
	const dispatch = useAppDispatch();
	const scores = useAppSelector((state) => state.quiz.scores);

	useEffect(() => {
		void dispatch(quizActions.getScores());
	}, [dispatch]);

	return (
		<div>
			<BalanceWheelChart
				data={
					scores
						? scores.map((score) => {
								return {
									categoryName: score.categoryName,
									data: score.score,
									label: String(score.score),
								};
							})
						: []
				}
			/>
		</div>
	);
};

export { UserWheel };
