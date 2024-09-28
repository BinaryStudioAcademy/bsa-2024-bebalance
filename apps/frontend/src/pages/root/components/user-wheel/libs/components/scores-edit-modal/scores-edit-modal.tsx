import { Button, Slider } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";
import { type QuizScoresGetAllItemResponseDto } from "~/modules/quiz/quiz.js";

import {
	AFTER_DISCARD_CHANGES_DELAY,
	IS_DISCARD_BUTTON_DISABLED_INITIAL_VALUE,
	IS_RESET_CHANGES_SCORES_INITIAL_VALUE,
} from "./libs/constants/constants.js";
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
	const { scores: originalScores } = useAppSelector(({ quiz }) => ({
		scores: quiz.scores,
	}));

	const [scores, setScores] = useState<ModalData[]>(data);
	const [isDiscardButtonDisabled, setIsDiscardButtonDisabled] =
		useState<boolean>(IS_DISCARD_BUTTON_DISABLED_INITIAL_VALUE);
	const [isResetChanges, setIsResetChanges] = useState<boolean>(
		IS_RESET_CHANGES_SCORES_INITIAL_VALUE,
	);

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

	const areChangesScores = useCallback(() => {
		for (const [index, score] of scores.entries()) {
			if (
				originalScores[index] &&
				originalScores[index].score !== score.score
			) {
				return true;
			}
		}

		return false;
	}, [originalScores, scores]);

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
		void dispatch(quizActions.getScores());
		setIsResetChanges(!IS_RESET_CHANGES_SCORES_INITIAL_VALUE);
	}, [setIsResetChanges, dispatch]);

	useEffect(() => {
		if (areChangesScores()) {
			setScores(originalScores);
			setIsResetChanges(IS_RESET_CHANGES_SCORES_INITIAL_VALUE);
			setTimeout(() => {
				setIsDiscardButtonDisabled(IS_DISCARD_BUTTON_DISABLED_INITIAL_VALUE);
			}, AFTER_DISCARD_CHANGES_DELAY);
		}
	}, [isResetChanges, setScores, originalScores, scores, areChangesScores]);

	useEffect(() => {
		return (): void => void dispatch(quizActions.getScores());
	}, [dispatch]);

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
