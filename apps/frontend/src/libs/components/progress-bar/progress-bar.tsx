import CheckIcon from "~/assets/img/check-icon.svg?react";
import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	currentStep: number;
	steps: number;
};

const LAST_INDEX_OFFSET = 1;

const ProgressBar: React.FC<Properties> = ({
	currentStep,
	steps,
}: Properties) => {
	const elementsArray = Array.from({ length: steps });

	return (
		<div className={styles["progress-bar"]}>
			{elementsArray.map((_, index) => {
				const isPrevious = index < currentStep;
				const isNext = index > currentStep;
				const isCurrent = index === currentStep;
				const isLastStep = index === steps - LAST_INDEX_OFFSET;

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
							{isPrevious ? <CheckIcon className={styles["check-icon"]} /> : ""}
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
