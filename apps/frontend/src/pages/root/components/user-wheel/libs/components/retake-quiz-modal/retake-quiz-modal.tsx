// import { QuizCategoriesForm } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const RetakeQuizModal: React.FC = () => {
	return (
		<div className={styles["container"]}>
			<div className={styles["categories-container"]}>
				{/* <QuizCategoriesForm
					buttonLabel="retake quiz"
					header="Do you feel any changes in anything? Choose the fields you want to reestimate"
				/> */}
			</div>
		</div>
	);
};

export { RetakeQuizModal };
