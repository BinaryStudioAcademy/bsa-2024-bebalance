import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type TaskDto } from "~/modules/tasks/tasks.js";

import { Category, Deadline } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	onExpire?: (expiredTask: TaskDto) => void;
	task: TaskDto;
	variant?: "active" | "expired";
};

const TaskCard: React.FC<Properties> = ({
	onExpire,
	task,
	variant = "active",
}: Properties) => {
	return (
		<div
			className={getValidClassNames(styles["card"], styles[`card-${variant}`])}
		>
			<div className={styles["card-header"]}>
				<Category categoryName={task.category} variant={variant} />
				<Deadline onExpire={onExpire} task={task} />
			</div>
			<div className={styles["card-body"]}>
				<h4 className={styles["title"]}>{task.label}</h4>
				<div className={styles["text"]}>{task.description}</div>
			</div>
		</div>
	);
};

export { TaskCard };
