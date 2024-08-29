import React from "react";

import CheckIcon from "~/assets/img/check-icon.svg?react";
import { getValidClassNames } from "~/libs/helpers/helpers.js";

import { type Step } from "./libs/types/type.js";
import styles from "./styles.module.css";

const LAST_INDEX_OFFSET = 1;

type Properties = {
	steps: Step[];
};

const ProgressBar: React.FC<Properties> = ({ steps }) => {
	return (
		<div className={styles["progress-bar"]}>
			{steps.map((stepObject, index) => {
				const isLastStep = index === steps.length - LAST_INDEX_OFFSET;
				const isCompleted = stepObject.status === "completed";

				return (
					<React.Fragment key={stepObject.step}>
						<div
							className={getValidClassNames(
								styles["progress-step"],
								styles[stepObject.status],
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
					</React.Fragment>
				);
			})}
		</div>
	);
};

export { ProgressBar };
export { type Step } from "./libs/types/type.js";
