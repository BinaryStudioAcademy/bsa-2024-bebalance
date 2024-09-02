import { Icon } from "~/libs/components/components.js";
import { PREVIOUS_INDEX_OFFSET } from "~/libs/constants/constants.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	currentQuestionIndex: number;
	totalQuestionsAmount: number;
};

const ProgressBar: React.FC<Properties> = ({
	currentQuestionIndex,
	totalQuestionsAmount,
}: Properties) => {
	return (
		<div className={styles["progress-bar"]}>
			{Array.from({ length: totalQuestionsAmount }).map((_, index) => {
				const isLastStep =
					index === totalQuestionsAmount - PREVIOUS_INDEX_OFFSET;
				const isCompleted = index < currentQuestionIndex;
				const isCurrent = index === currentQuestionIndex;
				const isUpcoming = index > currentQuestionIndex;

				return (
					<div className={styles["progress-bar-container"]} key={index}>
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
					</div>
				);
			})}
		</div>
	);
};

export { ProgressBar };
