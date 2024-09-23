import { Loader, Switch } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	actions as taskActions,
	type TaskNoteRequestDto,
} from "~/modules/tasks/tasks.js";

import { TaskCard } from "./libs/components/components.js";
import { TasksMode, TaskStatus } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const Tasks: React.FC = () => {
	const dispatch = useAppDispatch();
	const { dataStatus, tasks } = useAppSelector(({ tasks }) => {
		return {
			dataStatus: tasks.dataStatus,
			tasks: tasks.tasks,
		};
	});

	const [mode, setMode] = useState<ValueOf<typeof TasksMode>>(
		TasksMode.CURRENT,
	);

	useEffect(() => {
		void dispatch(taskActions.getCurrentTasks());
	}, [dispatch]);

	useEffect(() => {
		if (mode === TasksMode.CURRENT) {
			void dispatch(taskActions.getCurrentTasks());
		}

		if (mode === TasksMode.PAST) {
			void dispatch(taskActions.getPastTasks());
		}
	}, [dispatch, mode]);

	const handleAddTaskNote = useCallback(
		(payload: TaskNoteRequestDto) => {
			void dispatch(taskActions.addNote(payload));
		},
		[dispatch],
	);

	const handleGetTaskNotes = useCallback(
		(id: number) => {
			void dispatch(taskActions.getTaskNotes({ id }));
		},
		[dispatch],
	);

	const handleModeToggle = useCallback(() => {
		setMode((previousState) => {
			return previousState === TasksMode.CURRENT
				? TasksMode.PAST
				: TasksMode.CURRENT;
		});
	}, []);

	const handleSkip = useCallback(
		(id: number): void => {
			void dispatch(taskActions.update({ id, status: TaskStatus.SKIPPED }));
		},
		[dispatch],
	);

	const handleComplete = useCallback(
		(id: number): void => {
			void dispatch(taskActions.update({ id, status: TaskStatus.COMPLETED }));
		},
		[dispatch],
	);

	const isLoading = dataStatus === DataStatus.PENDING;

	return (
		<>
			<h4 className={styles["title"]}>My Tasks</h4>
			<div className={styles["board"]}>
				<div className={styles["board-header"]}>
					<div className={styles["switch-container"]}>
						<Switch
							currentMode={mode}
							leftButtonProperties={{
								label: "Active",
								mode: TasksMode.CURRENT,
							}}
							onToggleMode={handleModeToggle}
							rightButtonProperties={{ label: "Past", mode: TasksMode.PAST }}
						/>
					</div>
				</div>
				<div className={styles["cards-container"]}>
					{isLoading ? (
						<Loader />
					) : (
						tasks.map((task) => (
							<TaskCard
								key={task.id}
								onAddTaskNote={handleAddTaskNote}
								onComplete={handleComplete}
								onGetTaskNotes={handleGetTaskNotes}
								onSkip={handleSkip}
								task={task}
							/>
						))
					)}
				</div>
			</div>
		</>
	);
};

export { Tasks };
