import { Button } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type TaskDto } from "~/modules/tasks/tasks.js";

import { TaskStatus } from "../../enums/enums.js";
import { Category, Deadline, PastTaskStatus } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	onComplete: (id: number) => void;
	onSkip: (id: number) => void;
	task: TaskDto;
};

const TaskCard: React.FC<Properties> = ({
	onComplete,
	onSkip,
	task,
}: Properties) => {
	const handleSkip = useCallback(() => {
		onSkip(task.id);
	}, [task, onSkip]);

	const handleComplete = useCallback(() => {
		onComplete(task.id);
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
							<div className={styles["button-container"]}>
								<Button
									iconName="closeSmall"
									label="Skip the task"
									onClick={handleSkip}
									type="button"
									variant="action"
								/>
							</div>
							<div className={styles["button-container"]}>
								<Button
									iconName="checkBlack"
									label="Mark complete"
									onClick={handleComplete}
									type="button"
									variant="action"
								/>
							</div>
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
