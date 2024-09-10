import { QuizCategoriesForm } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type CategoriesFormSubmitCallback } from "~/libs/types/types.js";

import { CATEGORIES_FORM_ID } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const Chat: React.FC = () => {
	const handleCategoriesSubmit: CategoriesFormSubmitCallback =
		useCallback(() => {
			// TODO: Add a request to Backend
		}, []);

	return (
		<main className={styles["page-container"]}>
			<section className={styles["quiz-form-container"]}>
				<QuizCategoriesForm
					formId={CATEGORIES_FORM_ID}
					onSubmit={handleCategoriesSubmit}
				/>
			</section>
		</main>
	);
};

export { Chat };
