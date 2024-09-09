import { QuizCategoriesForm } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const Chat: React.FC = () => {
	return (
		<main className={styles["page-container"]}>
			<section className={styles["quiz-form-container"]}>
				<QuizCategoriesForm />
			</section>
		</main>
	);
};

export { Chat };
