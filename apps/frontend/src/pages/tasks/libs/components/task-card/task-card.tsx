import { type TaskDto } from "~/modules/tasks/tasks.js";

import { Category, Deadline } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	task: TaskDto;
};

const TaskCard: React.FC<Properties> = ({ task }: Properties) => {
	return (
		<div className={styles["card"]}>
			<div className={styles["card-header"]}>
				<Category categoryName={task.category} />
				<Deadline deadline={task.dueDate} />
			</div>
			<div className={styles["card-body"]}>
				<h4 className={styles["title"]}>{task.label}</h4>
				<div className={styles["text"]}>{task.description}</div>
			</div>
		</div>
	);
};

export { TaskCard };
