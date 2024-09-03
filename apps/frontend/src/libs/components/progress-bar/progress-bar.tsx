import { Icon } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	currentStep: number;
	numberOfSteps: number;
};

const LAST_INDEX_OFFSET = 1;

const ProgressBar: React.FC<Properties> = ({
	currentStep,
	numberOfSteps,
}: Properties) => {
	const progressSteps = Array.from({ length: numberOfSteps });

	return (
		<div className={styles["progress-bar"]}>
			{progressSteps.map((_, index) => {
				const isPrevious = index < currentStep;
				const isNext = index > currentStep;
				const isCurrent = index === currentStep;
				const isLastStep = index === numberOfSteps - LAST_INDEX_OFFSET;

				return (
					<div className={styles["progress"]} key={index}>
						<div
							className={getValidClassNames(
								styles["progress-step"],
								isCurrent && styles["current"],
								isNext && styles["upcoming"],
								isPrevious && styles["completed"],
							)}
						>
							{isPrevious ? (
								<div className={styles["check-icon"]}>
									<Icon name="check" />
								</div>
							) : (
								""
							)}
						</div>
						{!isLastStep && (
							<div
								className={getValidClassNames(
									styles["progress-line"],
									isPrevious && styles["completed"],
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
