import { Button, Slider } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";
import { type QuizScoresGetAllItemResponseDto } from "~/modules/quiz/quiz.js";

import { IS_DISCARD_BUTTON_DISABLED_INITIAL_VALUE } from "./libs/constants/constants.js";
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
	const [originalScores] = useState<ModalData[]>(data);
	const [isDiscardButtonDisabled, setIsDiscardButtonDisabled] =
		useState<boolean>(IS_DISCARD_BUTTON_DISABLED_INITIAL_VALUE);
	const [areChangesDiscarded, setAreChangesDiscarded] =
		useState<boolean>(false);

	const handleSaveChanges = useCallback(() => {
		if (!isDiscardButtonDisabled) {
			void dispatch(
				quizActions.editScores({
					items: scores,
				}),
			);
		}

		onSaveChanges();
	}, [onSaveChanges, dispatch, scores, isDiscardButtonDisabled]);

	const handleSliderChange = useCallback(
		(categoryId: number, value: number) => {
			setIsDiscardButtonDisabled(!IS_DISCARD_BUTTON_DISABLED_INITIAL_VALUE);

			setScores(
				scores.map((item) =>
					item.categoryId === categoryId ? { ...item, score: value } : item,
				),
			);

			const updatedScores = scores.map((score) => {
				return score.categoryId === categoryId
					? { ...score, score: value }
					: score;
			});

			void dispatch(
				quizActions.editScore(
					updatedScores as QuizScoresGetAllItemResponseDto[],
				),
			);
		},

		[scores, dispatch],
	);

	const handleDiscardChanges = useCallback(() => {
		setScores(originalScores);
		setAreChangesDiscarded((previousValue) => !previousValue);
	}, [setScores, setAreChangesDiscarded, originalScores]);

	useEffect(() => {
		if (areChangesDiscarded) {
			setAreChangesDiscarded((previousValue) => !previousValue);
			setIsDiscardButtonDisabled(IS_DISCARD_BUTTON_DISABLED_INITIAL_VALUE);
		}
	}, [areChangesDiscarded]);

	return (
		<div className={styles["container"]}>
			<p className={styles["text"]}>
				Do you feel any changes in anything? Estimate the fields from 1 to 10
			</p>
			<div className={styles["scores-container"]}>
				{scores.map((item, index) => (
					<Slider
						id={item.categoryId}
						key={index}
						label={item.categoryName}
						onValueChange={handleSliderChange}
						value={item.score}
					/>
				))}
			</div>
			<div className={styles["buttons-container"]}>
				<Button label="Save changes" onClick={handleSaveChanges} />
				<Button
					isDisabled={isDiscardButtonDisabled}
					label="Discard Changes"
					onClick={handleDiscardChanges}
					variant="secondary"
				/>
			</div>
		</div>
	);
};

export { ScoresEditModal };
