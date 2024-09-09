import {
	BalanceWheelChart,
	Button,
	ScoresEditModal,
} from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

import styles from "./styles.module.css";

const UserWheel: React.FC = () => {
	const NO_SCORES_COUNT = 0;
	const dispatch = useAppDispatch();
	const scores = useAppSelector((state) => state.quiz.scores);

	const [isEditingModalOpen, setIsEditingModalOpen] = useState<boolean>(false);

	const handleEditing = useCallback(() => {
		setIsEditingModalOpen(true);
	}, []);

	useEffect(() => {
		void dispatch(quizActions.getScores());
	}, [dispatch]);

	const chartData = scores.map((score) => {
		return {
			data: score.score,
			label: score.categoryName,
		};
	});

	const headerText = isEditingModalOpen
		? "Edit my wheel results"
		: "My wheel results";

	return (
		<div className={styles["container"]}>
			<div className={styles["header"]}>
				<h4 className={styles["header-text"]}>{headerText}</h4>
			</div>
			<div className={styles["content-wrapper"]}>
				{scores.length > NO_SCORES_COUNT && (
					<BalanceWheelChart data={chartData} />
				)}
				{isEditingModalOpen && (
					<ScoresEditModal data={scores} setClose={setIsEditingModalOpen} />
				)}
			</div>
			{isEditingModalOpen || (
				<Button label="edit my wheel results" onClick={handleEditing} />
			)}
		</div>
	);
};

export { UserWheel };
