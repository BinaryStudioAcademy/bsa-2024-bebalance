import { Icon } from "~/libs/components/components.js";
import { PREVIOUS_INDEX_OFFSET } from "~/libs/constants/constants.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	currentItemIndex: number;
	totalItemsAmount: number;
};

const ProgressBar: React.FC<Properties> = ({
	currentItemIndex,
	totalItemsAmount,
}: Properties) => {
	return (
		<div className={styles["progress-bar"]}>
			{Array.from({ length: totalItemsAmount }).map((_, index) => {
				const isLastStep = index === totalItemsAmount - PREVIOUS_INDEX_OFFSET;
				const isCompleted = index < currentItemIndex;
				const isCurrent = index === currentItemIndex;
				const isUpcoming = index > currentItemIndex;

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
