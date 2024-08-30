import { Icon } from "~/libs/components/components.js";
import { PREVIOUS_INDEX_OFFSET } from "~/libs/constants/constants.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const ProgressBar: React.FC = () => {
	const { currentQuestionIndex, totalQuestionsAmount } = useAppSelector(
		({ onboarding }) => ({
			currentQuestionIndex: onboarding.currentQuestionIndex,
			totalQuestionsAmount: onboarding.allQuestions.length,
		}),
	);

	return (
		<div className={styles["progress-bar"]}>
			{Array.from({ length: totalQuestionsAmount }).map((_, index) => {
				const isLastStep =
					index === totalQuestionsAmount - PREVIOUS_INDEX_OFFSET;
				const isCompleted = index < currentQuestionIndex;
				const isCurrent = index === currentQuestionIndex;
				const isUpcoming = index > currentQuestionIndex;

				return (
					<>
						<div
							className={getValidClassNames(
								styles["progress-step"],
								isCompleted && styles["completed"],
								isCurrent && styles["current"],
								isUpcoming && styles["upcoming"],
							)}
						>
							{isCompleted && <Icon name="check" />}
						</div>
						{!isLastStep && (
							<div
								className={getValidClassNames(
									styles["progress-line"],
									isCompleted && styles["progress-line-completed"],
								)}
							/>
						)}
					</>
				);
			})}
		</div>
	);
};

export { ProgressBar };
