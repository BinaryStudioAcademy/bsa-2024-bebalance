import CheckIcon from "~/assets/img/check-icon.svg?react";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppSelector } from "~/libs/hooks/use-app-selector/use-app-selector.hook.js";

import styles from "./styles.module.css";

const ONE_INDEX_OFFSET = 1;

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
				const isLastStep = index === totalQuestionsAmount - ONE_INDEX_OFFSET;
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
							{isCompleted && <CheckIcon className={styles["check-icon"]} />}
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
