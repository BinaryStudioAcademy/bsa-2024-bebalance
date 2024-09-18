// import { type TaskCreateDto } from "~/modules/tasks/tasks.js";
// import { TaskCard } from "~/pages/tasks/libs/components/components.js";

import styles from "./styles.module.css";

// type Properties = {
// 	taskList: TaskCreateDto[];
// };

const TaskListContainer: React.FC = () => {
	return (
		<ul className={styles["task-list"]}>
			{/* {taskList.map((task) => (
				<TaskCard key={task.description} task={task} />
			))} */}
		</ul>
	);
};

export { TaskListContainer };
