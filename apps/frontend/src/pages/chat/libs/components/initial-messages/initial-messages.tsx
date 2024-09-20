import { BalanceWheelChart } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";

import { handleButtonAction } from "../../helpers/handle-button-action.helper.js";
import { ChatButtons } from "../components.js";
import styles from "./styles.module.css";

const InitialMessages: React.FC = () => {
	const dispatch = useAppDispatch();
	const { scores, user } = useAppSelector((state) => ({
		scores: state.quiz.scores,
		user: state.auth.user,
	}));

	const chartData = scores.map((score) => {
		return {
			data: score.score,
			label: score.categoryName,
		};
	});

	const handleNo = useCallback(() => {
		void handleButtonAction(dispatch, "getCategoryForm");
	}, [dispatch]);

	const handleYes = useCallback(() => {
		void handleButtonAction(dispatch, "getTasks");
	}, [dispatch]);

	return (
		<>
			<div className={styles["message-container"]}>
				<p>
					Hello {user?.name}! I&apos;m so glad you&apos;re here and taking steps
					towards a more balanced life. You&apos;ve got this!
				</p>
			</div>
			<div className={styles["message-container"]}>
				<p>here&apos;s how your wheel looks like right now:</p>
				<div className={styles["content"]}>
					<BalanceWheelChart data={chartData} />
				</div>
			</div>
			<div className={styles["message-container"]}>
				<p>
					Do you want to work on 3 fields, with the lowest score, or you want to
					choose the fields to work on by yourself?
				</p>
				<div className={styles["content"]}>
					<ChatButtons
						handleNo={handleNo}
						handleYes={handleYes}
						noButtonLabel="no, smth else"
						yesButtonLabel="yes, 3 lowest"
					/>
				</div>
			</div>
		</>
	);
};

export { InitialMessages };
