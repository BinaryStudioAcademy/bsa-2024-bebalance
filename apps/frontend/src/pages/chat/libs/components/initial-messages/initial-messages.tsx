import { BalanceWheelChart, Icon } from "~/libs/components/components.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const InitialMessages: React.FC = () => {
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

	return (
		<>
			<div className={styles["message-container"]}>
				<Icon name="aiAssistantAvatar" />
				<div className={styles["content-container"]}>
					<p>
						Hello {user?.name}! I&apos;m so glad you&apos;re here and taking
						steps towards a more balanced life. You&apos;ve got this!
					</p>
				</div>
			</div>
			<div className={styles["message-container"]}>
				<Icon name="aiAssistantAvatar" />
				<div className={styles["content-container"]}>
					<p>here&apos;s how your wheel looks like right now:</p>
					<div className={styles["content"]}>
						<BalanceWheelChart data={chartData} variant="chat" />
					</div>
				</div>
			</div>
		</>
	);
};

export { InitialMessages };
