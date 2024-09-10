import { TaskCard } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Tasks: React.FC = () => {
	return (
		<>
			<h4 className={styles["title"]}>My Tasks</h4>
			<div className={styles["board"]}>
				<TaskCard categoryName="Love" />
				<TaskCard categoryName="Work" />
				<TaskCard categoryName="Free time" />
				<TaskCard categoryName="Physical" />
				<TaskCard categoryName="Mental" />
				<TaskCard categoryName="Spiritual" />
				<TaskCard categoryName="Friend" />
				<TaskCard categoryName="Money" />
			</div>
		</>
	);
};

export { Tasks };
