import { Button } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type TaskCreateDto, type TaskDto } from "~/modules/tasks/tasks.js";

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
	task: TaskCreateDto | TaskDto;
};

const TaskCard: React.FC<Properties> = ({
	onComplete,
	onSkip,
	task,
}: Properties) => {
	const handleSkip = useCallback(() => {
		if (onSkip) {
			onSkip((task as TaskDto).id);
		}
	}, [task, onSkip]);

	const handleComplete = useCallback(() => {
		if (onComplete) {
			onComplete((task as TaskDto).id);
		}
	}, [task, onComplete]);

	const isActive = (task as TaskDto).status === TaskStatus.CURRENT;
	const isChatTask = Boolean(onComplete) && Boolean(onSkip);

	return (
		<div className={styles["card"]}>
			<div className={styles["card-header"]}>
				<Category
					categoryName={
						(task as TaskDto).category || (task as TaskCreateDto).categoryName
					}
				/>
				{isActive && <Deadline deadline={task.dueDate} />}
			</div>
			<div className={styles["card-body"]}>
				<h4 className={styles["title"]}>{task.label}</h4>
				<div className={styles["text"]}>{task.description}</div>
			</div>
			<div className={styles["card-footer"]}>
				<div className={styles["divider"]} />
				<div className={styles["buttons-container"]}>
					{isActive && isChatTask ? (
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
							{isChatTask && (
								<PastTaskStatus status={(task as TaskDto).status} />
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export { TaskCard };
