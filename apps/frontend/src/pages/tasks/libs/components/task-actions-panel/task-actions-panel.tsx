import { Button } from "~/libs/components/components.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import {
	type TaskDto,
	actions as tasksActions,
} from "~/modules/tasks/tasks.js";

import { TaskStatus } from "../../enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	currentTaskIndex: number;
	onResolve: () => void;
	tasks: TaskDto[];
};

const TaskActionsPanel: React.FC<Properties> = ({
	currentTaskIndex,
	onResolve,
	tasks,
}: Properties) => {
	const SINGLE_TASK = 1;

	const dispatch = useAppDispatch();
	const totalTasks = tasks.length;
	const isSingleTask = totalTasks === SINGLE_TASK;

	const handleTaskAction = useCallback(
		(action: (task: TaskDto) => void) => {
			return (): void => {
				const task = tasks[currentTaskIndex] as TaskDto;
				action(task);
				onResolve();
			};
		},
		[currentTaskIndex, tasks, onResolve],
	);

	const handleTaskSkipping = handleTaskAction((task) => {
		void dispatch(
			tasksActions.update({
				id: task.id,
				status: TaskStatus.SKIPPED,
			}),
		);
	});

	const handleTaskCompletion = handleTaskAction((task) => {
		void dispatch(
			tasksActions.update({
				id: task.id,
				status: TaskStatus.COMPLETED,
			}),
		);
	});

	const handleExtendingDeadline = handleTaskAction((task) => {
		void dispatch(tasksActions.updateTaskDeadline(task.id));
	});

	return (
		<div className={styles["lower-content"]}>
			<p className={styles["introduction"]}>
				Do you want to extend the deadline by 24 hours?
			</p>
			<div className={styles["actions"]}>
				<Button
					label="Yes, I want to extend deadline"
					onClick={handleExtendingDeadline}
				/>
				<Button
					label="No, I want to skip this task"
					onClick={handleTaskSkipping}
					variant="secondary"
				/>
				<Button
					label="I already complete this task"
					onClick={handleTaskCompletion}
					variant="secondary"
				/>
			</div>
			{!isSingleTask && (
				<div className={styles["counter"]}>
					<p className={styles["page-number"]}>
						{currentTaskIndex + SINGLE_TASK}
					</p>
					<p className={styles["total-page-number"]}>/{totalTasks}</p>
				</div>
			)}
		</div>
	);
};

export { TaskActionsPanel };
