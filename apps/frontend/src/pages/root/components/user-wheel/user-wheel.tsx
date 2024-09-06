import { BalanceWheelChart } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

import styles from "./styles.module.css";

const UserWheel: React.FC = () => {
	const NO_SCORES_COUNT = 0;
	const dispatch = useAppDispatch();
	const scores = useAppSelector((state) => state.quiz.scores);

	useEffect(() => {
		void dispatch(quizActions.getScores());
	}, [dispatch]);

	const chartData = scores.map((score) => ({
		data: score.score,
		label: score.categoryName,
	}));

	return (
		<div className={styles["container"]}>
			{scores.length > NO_SCORES_COUNT && (
				<BalanceWheelChart data={chartData} />
			)}
		</div>
	);
};

export { UserWheel };
