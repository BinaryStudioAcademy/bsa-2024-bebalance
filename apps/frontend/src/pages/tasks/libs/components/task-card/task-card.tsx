import { Button } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type TaskDto } from "~/modules/tasks/tasks.js";

import { TaskStatus } from "../../enums/enums.js";
import { Category, Deadline, PastTaskStatus } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	onComplete?: (id: number) => void;
	onExpire?: (expiredTask: TaskDto) => void;
	onSkip?: (id: number) => void;
	task: TaskDto;
	variant?: "active" | "expired";
};

const TaskCard: React.FC<Properties> = ({
	onComplete = (): void => {},
	onExpire = (): void => {},
	onSkip = (): void => {},
	task,
	variant = "active",
}: Properties) => {
	const handleSkip = useCallback(() => {
		onSkip(task.id);
	}, [task, onSkip]);

	const handleComplete = useCallback(() => {
		onComplete(task.id);
	}, [task, onComplete]);

	const handleExpire = useCallback(() => {
		onExpire(task);
	}, [task, onExpire]);

	const areActionsDisabled = variant === "expired";
	const buttonsContainerClass = getValidClassNames(
		styles["buttons-container"],
		areActionsDisabled && styles["buttons-container-expired"],
	);
	const isActive = task.status === TaskStatus.CURRENT;

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
									iconName="closeSmallGray"
									isDisabled={areActionsDisabled}
									label="Skip the task"
									labelVariant="light"
									onClick={handleSkip}
									type="button"
									variant="action"
								/>
							</div>
							<div className={styles["button-container"]}>
								<Button
									iconName="checkGray"
									isDisabled={areActionsDisabled}
									label="Mark complete"
									labelVariant="light"
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
