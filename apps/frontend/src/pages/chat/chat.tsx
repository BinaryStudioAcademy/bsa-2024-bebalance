import { QuizCategoriesForm } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type CategoriesFormChangeDto } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const Chat: React.FC = () => {
	const handleCategoriesChange: CategoriesFormChangeDto = useCallback(() => {
		// TODO: Add a request to Backend
	}, []);

	return (
		<main className={styles["page-container"]}>
			<section className={styles["quiz-form-container"]}>
				<QuizCategoriesForm onChange={handleCategoriesChange} />
			</section>
		</main>
	);
};

export { Chat };
