import { Button } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type TaskCreateDto, type TaskDto } from "~/modules/tasks/tasks.js";

import { Deadline } from "../deadline/deadline.js";
import { Category, PastTaskStatus } from "./libs/components/components.js";
import { IconColorVariant, TaskStatus } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	onComplete?: (id: number) => void;
	onExpire?: (expiredTask: TaskDto) => void;
	onSkip?: (id: number) => void;
	task: TaskCreateDto | TaskDto;
	variant?: "active" | "expired";
};

const TaskCard: React.FC<Properties> = ({
	onComplete,
	onExpire,
	onSkip,
	task,
	variant = "active",
}: Properties) => {
	const handleSkip = useCallback(() => {
		onSkip?.((task as TaskDto).id);
	}, [task, onSkip]);

	const handleComplete = useCallback(() => {
		onComplete?.((task as TaskDto).id);
	}, [task, onComplete]);

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
				<Category categoryName={task.categoryName} />
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
		</div>
	);
};

export { TaskCard };
