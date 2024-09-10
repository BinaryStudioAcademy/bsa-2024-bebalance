import { useAppDispatch, useCallback, useState } from "~/libs/hooks/hooks.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

import { Button, Slider } from "../components.js";
import { NO_SCORES_COUNT } from "./libs/constants/constants.js";
import { type ModalData } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	data: ModalData[];
	onSaveChanges: () => void;
};

const ScoresEditModal: React.FC<Properties> = ({
	data,
	onSaveChanges,
}: Properties) => {
	const dispatch = useAppDispatch();
	const [scores, setScores] = useState<ModalData[]>(data);

	const handleSaveChanges = useCallback(() => {
		const originalScores = new Map(data.map((item) => [item.categoryId, item]));

		const changedScores = scores.filter((score) => {
			const originalScore = originalScores.get(score.categoryId);

			return originalScore && score.score !== originalScore.score;
		});

		if (changedScores.length > NO_SCORES_COUNT) {
			void dispatch(quizActions.editScores({ items: changedScores }));
		}

		onSaveChanges();
	}, [onSaveChanges, dispatch, scores, data]);

	const handleSliderChange = useCallback(
		(categoryId: number, value: number) => {
			setScores(
				scores.map((item) =>
					item.categoryId === categoryId ? { ...item, score: value } : item,
				),
			);
		},
		[scores],
	);

	return (
		<div className={styles["container"]}>
			<p className={styles["text"]}>
				Do you feel any changes in anything? Estimate the fields from 1 to 10
			</p>
			<div className={styles["scores-container"]}>
				{data.map((item, index) => (
					<Slider
						id={item.categoryId}
						key={index}
						label={item.categoryName}
						onValueChange={handleSliderChange}
						value={item.score}
					/>
				))}
			</div>
			<Button label="Save changes" onClick={handleSaveChanges} />
		</div>
	);
};

export { ScoresEditModal };
