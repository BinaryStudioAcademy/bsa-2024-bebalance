import {
	BalanceWheelChart,
	Button,
	Loader,
	Switch,
} from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

import { CircularProgress } from "../circular-progress/circular-progress.js";
import {
	RetakeQuizModal,
	ScoresEditModal,
} from "./libs/components/components.js";
import {
	NO_SCORES_COUNT,
	NO_TASKS_PERCENTAGE,
} from "./libs/constants/constants.js";
import { getFormattedDate } from "./libs/helpers/helpers.js";
import { type WheelEditMode } from "./libs/types/types.js";
import styles from "./styles.module.css";

const UserWheel: React.FC = () => {
	const dispatch = useAppDispatch();
	const { completionTasksPercentage, dataStatus, scores, scoresLastUpdatedAt } =
		useAppSelector(({ auth, quiz }) => ({
			completionTasksPercentage: auth.user?.completionTasksPercentage,
			dataStatus: quiz.dataStatus,
			scores: quiz.scores,
			scoresLastUpdatedAt: quiz.scoresLastUpdatedAt,
		}));
	const [isEditingModalOpen, setIsEditingModalOpen] = useState<boolean>(false);
	const [editMode, setEditMode] = useState<WheelEditMode>("manual");
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

	const estimationStyles = getValidClassNames(
		styles["content"],
		isEditingModalOpen && styles["hidden"],
	);

	const dateContainerStyles = getValidClassNames(
		styles["date-container"],
		isEditingModalOpen && styles["hidden"],
	);

	const modalStyles = getValidClassNames(
		styles["content"],
		!isEditingModalOpen && styles["hidden"],
	);

	const lastWheelUpdateDate = scoresLastUpdatedAt
		? getFormattedDate(new Date(scoresLastUpdatedAt), "d MMM yyyy, EEEE")
		: null;

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

	const handleGetModal = (mode: WheelEditMode): React.ReactNode => {
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
				return null;
			}
		}
	};

	return (
		<div className={styles["container"]}>
			<div className={styles["header"]}>
				<div className={styles["header-text-container"]}>
					<h4 className={styles["header-text"]}>{headerText}</h4>
					<div className={dateContainerStyles}>
						<p className={styles["date"]}>{lastWheelUpdateDate}</p>
					</div>
				</div>
				{isEditingModalOpen && (
					<div className={styles["switch-container"]}>
						<Switch
							currentMode={editMode}
							leftButtonProperties={{ label: "Edit manually", mode: "manual" }}
							onToggleMode={handleModeToggle}
							rightButtonProperties={{
								label: "Retake quiz",
								mode: "retake_quiz",
							}}
						/>
					</div>
				)}
			</div>
			<div className={styles["content-wrapper"]}>
				{scores.length > NO_SCORES_COUNT && (
					<div className={estimationStyles}>
						<BalanceWheelChart data={chartData} />
						<CircularProgress
							percentage={completionTasksPercentage ?? NO_TASKS_PERCENTAGE}
						/>
					</div>
				)}
				<div className={modalStyles}>
					{isEditingModalOpen && handleGetModal(editMode)}
				</div>
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
