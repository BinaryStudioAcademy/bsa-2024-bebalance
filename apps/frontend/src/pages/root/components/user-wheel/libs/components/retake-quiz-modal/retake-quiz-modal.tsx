import { QuizCategoriesForm } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { actions as appActions } from "~/modules/app/app.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

import styles from "./styles.module.css";

const RetakeQuizModal: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleSubmit = useCallback(
		(payload: number[]): void => {
			const payloadStringified = JSON.stringify(payload);
			void dispatch(
				quizActions.getQuestionsByCategoryIds({
					categoryIds: payloadStringified,
				}),
			);
			void dispatch(appActions.changeLink(AppRoute.QUIZ));
		},
		[dispatch],
	);

	return (
		<div className={styles["container"]}>
			<div className={styles["categories-container"]}>
				<QuizCategoriesForm
					buttonLabel="retake quiz"
					header="Do you feel any changes in anything? Choose the fields you want to reestimate"
					onSubmit={handleSubmit}
				/>
			</div>
		</div>
	);
};

export { RetakeQuizModal };
