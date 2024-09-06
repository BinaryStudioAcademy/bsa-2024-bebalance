import { QuizCategoriesForm } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const Chat: React.FC = () => {
	return (
		<main className={styles["page-container"]}>
			<section>Wheel Component</section>
			<section className={styles["quiz-form-container"]}>
				<strong>Do you feel any changes in anything?</strong>
				<strong>Choose the fields you want to reestimate</strong>
				<br />
				<QuizCategoriesForm />
			</section>
		</main>
	);
};

export { Chat };
