import { Icon } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import { TaskStatus } from "../../enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	status: ValueOf<typeof TaskStatus>;
};

const PastTaskStatus: React.FC<Properties> = ({ status }: Properties) => {
	const isCompleted = status === TaskStatus.COMPLETED;
	const isSkipped = status === TaskStatus.SKIPPED;

	return (
		<div
			className={getValidClassNames(
				styles["status"],
				isCompleted && styles["completed"],
				isSkipped && styles["skipped"],
			)}
		>
			<Icon name={isCompleted ? "checkSmall" : "closeSmall"} />
			<span>{status}</span>
		</div>
	);
};

export { PastTaskStatus };
