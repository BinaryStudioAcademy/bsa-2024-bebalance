import {
	BalanceWheelChart,
	Button,
	Loader,
	ScoresEditModal,
} from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

import {
	EditModeSwitch,
	RetakeQuizModal,
} from "./libs/components/components.js";
import { type EditMode } from "./libs/types/types.js";
import styles from "./styles.module.css";

const UserWheel: React.FC = () => {
	const NO_SCORES_COUNT = 0;

	const dispatch = useAppDispatch();
	const { dataStatus, scores } = useAppSelector((state) => state.quiz);
	const [isEditingModalOpen, setIsEditingModalOpen] = useState<boolean>(false);
	const [editMode, setEditMode] = useState<EditMode>("manual");
	const isLoading = dataStatus === "pending";

	const chartData = scores.map((score) => {
		return {
			data: score.score,
			label: score.categoryName,
		};
	});

	const headerText = isEditingModalOpen
		? "Edit my wheel results"
		: "My wheel results";

	const handleEditing = useCallback(() => {
		setIsEditingModalOpen(true);
	}, []);

	const handleFinishEditing = useCallback(() => {
		setIsEditingModalOpen(false);
	}, []);

	const handleModeToggle = useCallback(() => {
		setEditMode((previousState) => {
			return previousState === "manual" ? "retake_quiz" : "manual";
		});
	}, []);

	useEffect(() => {
		void dispatch(quizActions.getScores());
	}, [dispatch]);

	function getModal(mode: EditMode): React.ReactNode {
		switch (mode) {
			case "manual": {
				return (
					<ScoresEditModal data={scores} onSaveChanges={handleFinishEditing} />
				);
			}

			case "retake_quiz": {
				return <RetakeQuizModal />;
			}

			default: {
				return;
			}
		}
	}

	return (
		<div className={styles["container"]}>
			<div className={styles["header"]}>
				<h4 className={styles["header-text"]}>{headerText}</h4>
				{isEditingModalOpen && (
					<EditModeSwitch
						currentMode={editMode}
						handleModeToggle={handleModeToggle}
					/>
				)}
			</div>
			<div className={styles["content-wrapper"]}>
				{scores.length > NO_SCORES_COUNT && (
					<BalanceWheelChart data={chartData} />
				)}
				{isEditingModalOpen && getModal(editMode)}
			</div>
			{!isEditingModalOpen && (
				<div className={styles["button-wrapper"]}>
					<Button
						isDisabled={isLoading}
						label="edit my wheel results"
						onClick={handleEditing}
					/>
				</div>
			)}
			{isLoading && <Loader />}
		</div>
	);
};

export { UserWheel };
