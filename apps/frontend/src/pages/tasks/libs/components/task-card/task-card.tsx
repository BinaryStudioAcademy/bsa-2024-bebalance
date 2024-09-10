import { Category } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	categoryName: string;
};

const TaskCard: React.FC<Properties> = ({ categoryName }: Properties) => {
	return (
		<div className={styles["card"]}>
			<div className={styles["card-header"]}>
				<Category categoryName={categoryName} />
			</div>
			<div className={styles["card-body"]}>
				<h4 className={styles["title"]}>Meet person in the cafe</h4>
				<div className={styles["text"]}>
					Meet a person in the cafe Meet a person in the cafeMeet a person in
					the cafeMeet a person in the cafe
				</div>
			</div>
		</div>
	);
};

export { TaskCard };
