import { QuizCategoriesForm } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const Chat: React.FC = () => {
	const handleCategoriesSubmit = useCallback(() => {
		// TODO: Add a request to Backend
	}, []);

	return (
		<main className={styles["page-container"]}>
			<section className={styles["quiz-form-container"]}>
				<QuizCategoriesForm
					buttonLabel="Select"
					onSubmit={handleCategoriesSubmit}
				/>
			</section>
		</main>
	);
};

export { Chat };
