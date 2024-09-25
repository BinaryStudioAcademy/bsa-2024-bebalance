import {
	BalanceWheelChart,
	Button,
	Loader,
	Switch,
} from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";
import { actions as userActions, type UserDto } from "~/modules/users/users.js";

import { CircularProgress } from "../circular-progress/circular-progress.js";
import {
	RetakeQuizModal,
	ScoresEditModal,
} from "./libs/components/components.js";
import {
	getFormattedDate,
	getLocalDatestring,
} from "./libs/helpers/helpers.js";
import { type WheelEditMode } from "./libs/types/types.js";
import styles from "./styles.module.css";

const NO_SCORES_COUNT = 0;

const UserWheel: React.FC = () => {
	const dispatch = useAppDispatch();
	const {
		authenticatedUser,
		completionTasksPercentage,
		dataStatus,
		scores,
		scoresLastUpdatedAt,
	} = useAppSelector(({ auth, quiz, users }) => ({
		authenticatedUser: auth.user,
		completionTasksPercentage: users.user?.completionTasksPercentage,
		dataStatus: quiz.dataStatus,
		scores: quiz.scores,
		scoresLastUpdatedAt: quiz.scoresLastUpdatedAt,
	}));
	const [isEditingModalOpen, setIsEditingModalOpen] = useState<boolean>(false);
	const [percentage, setPercentage] = useState<number>(NO_SCORES_COUNT);
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

	const lastWheelUpdateDate = scoresLastUpdatedAt
		? getFormattedDate(
				new Date(getLocalDatestring(scoresLastUpdatedAt)),
				"d MMM yyyy, EEEE",
			)
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

	useEffect(() => {
		void dispatch(
			userActions.getById({ id: (authenticatedUser as UserDto).id }),
		);
	}, [dispatch, authenticatedUser]);

	useEffect(() => {
		if (completionTasksPercentage) {
			setPercentage(completionTasksPercentage);
		}
	}, [completionTasksPercentage]);

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
					<div className={styles["date-conrainer"]}>
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
					<div>
						<BalanceWheelChart data={chartData} />
						<CircularProgress percentage={percentage} />
					</div>
				)}
				{isEditingModalOpen && handleGetModal(editMode)}
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
