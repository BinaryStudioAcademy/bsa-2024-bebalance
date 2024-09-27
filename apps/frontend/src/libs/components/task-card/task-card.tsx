import { Button } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useEffect, useState } from "~/libs/hooks/hooks.js";
import {
	type AddTaskNoteHandler,
	type TaskCreateDto,
	type TaskDto,
} from "~/modules/tasks/tasks.js";

import { Deadline } from "../deadline/deadline.js";
import {
	Category,
	Notes,
	PastTaskStatus,
} from "./libs/components/components.js";
import { IconColorVariant, TaskStatus } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	onAddTaskNote?: AddTaskNoteHandler;
	onComplete?: (id: number) => void;
	onExpire?: (expiredTask: TaskDto) => void;
	onGetTaskNotes?: (id: number) => void;
	onSkip?: (id: number) => void;
	task: TaskCreateDto | TaskDto;
	variant?: "active" | "expired";
};

const TaskCard: React.FC<Properties> = ({
	onAddTaskNote,
	onComplete,
	onExpire,
	onGetTaskNotes,
	onSkip,
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
		onSkip?.((task as TaskDto).id);
	}, [task, onSkip]);

	const handleComplete = useCallback(() => {
		onComplete?.((task as TaskDto).id);
	}, [task, onComplete]);

	useEffect(() => {
		onGetTaskNotes?.((task as TaskDto).id);
	}, [onGetTaskNotes, task]);

	const handleExpire = useCallback(() => {
		onExpire?.(task as TaskDto);
	}, [task, onExpire]);

	const isActive = (task as TaskDto).status === TaskStatus.CURRENT;
	const isAcceptedTask = Boolean(onComplete) && Boolean(onSkip);

	const areActionsDisabled = variant === "expired";
	const buttonsContainerClass = getValidClassNames(
		styles["buttons-container"],
		areActionsDisabled && styles["buttons-container-expired"],
	);
	const iconColor = areActionsDisabled
		? IconColorVariant.LIGHT
		: IconColorVariant.PRIMARY;

	return (
		<div
			className={getValidClassNames(styles["card"], styles[`card-${variant}`])}
		>
			<div className={styles["card-header"]}>
				<Category categoryName={task.categoryName} variant={variant} />
				{isActive && (
					<Deadline
						deadline={(task as TaskDto).dueDate}
						onExpire={handleExpire}
					/>
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
							{isAcceptedTask && (
								<PastTaskStatus status={(task as TaskDto).status} />
							)}
						</div>
					)}
				</div>
			</div>

			{isNoteOpen && (
				<Notes
					onNoteClose={handleNoteClose}
					onSubmit={onAddTaskNote as AddTaskNoteHandler}
					task={task as TaskDto}
				/>
			)}
		</div>
	);
};

export { TaskCard };
