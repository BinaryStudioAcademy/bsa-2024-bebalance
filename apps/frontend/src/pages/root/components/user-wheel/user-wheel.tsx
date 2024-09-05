import { BalanceWheelChart } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

import styles from "./styles.module.css";

const UserWheel: React.FC = () => {
	const dispatch = useAppDispatch();
	const scores = useAppSelector((state) => state.quiz.scores);
	const scoreCountZero = 0;

	useEffect(() => {
		void dispatch(quizActions.getScores());
	}, [dispatch]);

	return (
		<div className={styles["container"]}>
			{scores.length > scoreCountZero && (
				<BalanceWheelChart
					data={scores.map((score) => ({
						data: score.score,
						label: score.categoryName,
					}))}
					isAnimating={false}
				/>
			)}
		</div>
	);
};

export { UserWheel };
