import { Button } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type TaskDto } from "~/modules/tasks/tasks.js";

import {
	Category,
	Deadline,
	PastTaskStatus,
} from "./libs/components/components.js";
import { TaskStatus } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	onComplete?: (id: number) => void;
	onSkip?: (id: number) => void;
	task: TaskDto;
};

const TaskCard: React.FC<Properties> = ({
	onComplete,
	onSkip,
	task,
}: Properties) => {
	const handleSkip = useCallback(() => {
		if (onSkip) {
			onSkip(task.id);
		}
	}, [task, onSkip]);

	const handleComplete = useCallback(() => {
		if (onComplete) {
			onComplete(task.id);
		}
	}, [task, onComplete]);

	const isActive = task.status === TaskStatus.CURRENT;

	return (
		<div className={styles["card"]}>
			<div className={styles["card-header"]}>
				<Category categoryName={task.category} />
				{isActive && <Deadline deadline={task.dueDate} />}
			</div>
			<div className={styles["card-body"]}>
				<h4 className={styles["title"]}>{task.label}</h4>
				<div className={styles["text"]}>{task.description}</div>
			</div>
			<div className={styles["card-footer"]}>
				<div className={styles["divider"]} />
				<div className={styles["buttons-container"]}>
					{isActive ? (
						<>
							{Boolean(onSkip) && (
								<div className={styles["button-container"]}>
									<Button
										iconName="closeSmall"
										label="Skip the task"
										onClick={handleSkip}
										type="button"
										variant="action"
									/>
								</div>
							)}
							{Boolean(onComplete) && (
								<div className={styles["button-container"]}>
									<Button
										iconName="checkBlack"
										label="Mark complete"
										onClick={handleComplete}
										type="button"
										variant="action"
									/>
								</div>
							)}
						</>
					) : (
						<div>
							<PastTaskStatus status={task.status} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export { TaskCard };
