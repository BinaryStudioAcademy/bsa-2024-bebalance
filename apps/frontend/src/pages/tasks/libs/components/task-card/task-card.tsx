import { Button } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useEffect, useState } from "~/libs/hooks/hooks.js";
import {
	type TaskDto,
	type TaskNoteRequestDto,
} from "~/modules/tasks/tasks.js";

import { TaskStatus } from "../../enums/enums.js";
import { Category, Deadline, Notes, PastTaskStatus } from "../components.js";
import { IconColorVariant } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	onAddTaskNote: (payload: TaskNoteRequestDto) => void;
	onComplete?: (id: number) => void;
	onExpire?: (expiredTask: TaskDto) => void;
	onGetTaskNotes: (id: number) => void;
	onSkip?: (id: number) => void;
	task: TaskDto;
	variant?: "active" | "expired";
};

const TaskCard: React.FC<Properties> = ({
	onAddTaskNote,
	onComplete = (): void => {},
	onExpire = (): void => {},
	onGetTaskNotes,
	onSkip = (): void => {},
	task,
	variant = "active",
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

	useEffect(() => {
		onGetTaskNotes(task.id);
	}, [onGetTaskNotes, task.id]);

	const handleExpire = useCallback(() => {
		onExpire(task);
	}, [task, onExpire]);

	const areActionsDisabled = variant === "expired";
	const buttonsContainerClass = getValidClassNames(
		styles["buttons-container"],
		areActionsDisabled && styles["buttons-container-expired"],
	);
	const isActive = task.status === TaskStatus.CURRENT;
	const iconColor = areActionsDisabled
		? IconColorVariant.LIGHT
		: IconColorVariant.PRIMARY;

	return (
		<div
			className={getValidClassNames(styles["card"], styles[`card-${variant}`])}
		>
			<div className={styles["card-header"]}>
				<Category categoryName={task.category} variant={variant} />
				{isActive && (
					<Deadline deadline={task.dueDate} onExpire={handleExpire} />
				)}
			</div>
			<div className={styles["card-body"]}>
				<h4 className={styles["title"]}>{task.label}</h4>
				<div className={styles["text"]}>{task.description}</div>
			</div>
			<div className={styles["card-footer"]}>
				<div
					className={getValidClassNames(
						styles["divider"],
						styles[`divider-${variant}`],
					)}
				/>
				<div className={buttonsContainerClass}>
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
									hasVisuallyHiddenLabel
									iconColor=""
									iconName="note"
									iconPosition="left"
									label="notes"
									onClick={handleNoteOpen}
									variant="icon"
								/>
								<Button
									iconColor={iconColor}
									iconName="closeSmall"
									isDisabled={areActionsDisabled}
									label="Skip the task"
									labelVariant={areActionsDisabled ? "light" : "primary"}
									onClick={handleSkip}
									type="button"
									variant="action"
								/>
							</div>
							<div className={styles["button-container"]}>
								<Button
									iconColor={iconColor}
									iconName="checkSmall"
									isDisabled={areActionsDisabled}
									label="Mark complete"
									labelVariant={areActionsDisabled ? "light" : "primary"}
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
