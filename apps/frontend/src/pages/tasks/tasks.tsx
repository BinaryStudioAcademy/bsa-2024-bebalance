import styles from "./styles.module.css";

const Tasks: React.FC = () => {
	return (
		<>
			<h4 className={styles["title"]}>My Tasks</h4>
			<div className={styles["board"]}>tasks</div>
		</>
	);
};

export { Tasks };
