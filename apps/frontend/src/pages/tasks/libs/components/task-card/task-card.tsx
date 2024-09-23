import { Button } from "~/libs/components/components.js";
import { useCallback, useEffect, useState } from "~/libs/hooks/hooks.js";
import {
	type TaskDto,
	type TaskNoteRequestDto,
} from "~/modules/tasks/tasks.js";

import { TaskStatus } from "../../enums/enums.js";
import { Category, Deadline, Notes, PastTaskStatus } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	onAddTaskNote: (payload: TaskNoteRequestDto) => void;
	onComplete: (id: number) => void;
	onGetTaskNotes: (id: number) => void;
	onSkip: (id: number) => void;
	task: TaskDto;
};

const TaskCard: React.FC<Properties> = ({
	onAddTaskNote,
	onComplete,
	onGetTaskNotes,
	onSkip,
	task,
}: Properties) => {
	const [isNoteOpen, setIsNoteOpen] = useState<boolean>(false);

	const handleNoteOpen = useCallback(() => {
		setIsNoteOpen(true);
	}, []);

	const handleNoteClose = useCallback(() => {
		setIsNoteOpen(false);
	}, []);

	const handleSkip = useCallback(() => {
		onSkip(task.id);
	}, [task, onSkip]);

	const handleComplete = useCallback(() => {
		onComplete(task.id);
	}, [task, onComplete]);

	useEffect(() => {
		onGetTaskNotes(task.id);
	}, [onGetTaskNotes, task.id]);

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
									hasVisuallyHiddenLabel
									iconName="note"
									iconPosition="left"
									label="notes"
									onClick={handleNoteOpen}
									variant="icon"
								/>
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

			{isNoteOpen && (
				<Notes
					onNoteClose={handleNoteClose}
					onSubmit={onAddTaskNote}
					task={task}
				/>
			)}
		</div>
	);
};

export { TaskCard };
