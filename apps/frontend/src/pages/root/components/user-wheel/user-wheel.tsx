import { BalanceWheelChart, Button } from "~/libs/components/components.js";
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

	const chartData = scores.map((score) => {
		return {
			data: score.score,
			label: score.categoryName,
		};
	});

	return (
		<div className={styles["container"]}>
			<div className={styles["header"]}>
				<h4 className={styles["header-text"]}>My wheel results</h4>
			</div>
			<div className={styles["chart-wrapper"]}>
				{scores.length > NO_SCORES_COUNT && (
					<BalanceWheelChart data={chartData} />
				)}
			</div>
			<Button label="edit my wheel results" />
		</div>
	);
};

export { UserWheel };
