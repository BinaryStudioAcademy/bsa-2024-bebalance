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
import { actions as taskActions, type TaskDto } from "~/modules/tasks/tasks.js";

import { ExpiredTasksModal, TaskCard } from "./libs/components/components.js";
import { NO_EXPIRED_TASKS, ONE_MINUTE } from "./libs/constants/constants.js";
import { TasksMode, TaskStatus } from "./libs/enums/enums.js";
import { getTimeLeft } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const Tasks: React.FC = () => {
	const dispatch = useAppDispatch();
	const { dataStatus, tasks } = useAppSelector(({ tasks }) => {
		return {
			dataStatus: tasks.dataStatus,
			tasks: tasks.tasks,
		};
	});
	const [expiredTasks, setExpiredTasks] = useState<TaskDto[]>([]);
	const [activeTasks, setActiveTasks] = useState<TaskDto[]>([]);

	const [mode, setMode] = useState<ValueOf<typeof TasksMode>>(
		TasksMode.CURRENT,
	);

	const handleTaskExpiration = useCallback(
		(expiredTask: TaskDto) => {
			const newExpiredTasks = [...expiredTasks, expiredTask];
			const newActiveTasks = [...activeTasks].filter(
				(task) => task.id !== expiredTask.id,
			);
			setExpiredTasks(newExpiredTasks);
			setActiveTasks(newActiveTasks);
		},
		[expiredTasks, activeTasks],
	);

	useEffect(() => {
		const currentTime = Date.now();
		const expired: TaskDto[] = [];
		const active: TaskDto[] = [];

		for (const task of tasks) {
			const timeToDeadline = getTimeLeft(currentTime, task.dueDate);

			if (timeToDeadline < ONE_MINUTE) {
				expired.push(task);
			} else {
				active.push(task);
			}
		}

		setExpiredTasks(expired);
		setActiveTasks(active);
	}, [tasks]);

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

	const renderTaskCards = (tasks: TaskDto[]): JSX.Element[] =>
		tasks.map((task) => (
			<TaskCard
				key={task.id}
				onComplete={handleComplete}
				onExpire={handleTaskExpiration}
				onSkip={handleSkip}
				task={task}
			/>
		));

	const isLoading = dataStatus === DataStatus.PENDING;
	const taskbarTasks = mode === TasksMode.CURRENT ? activeTasks : tasks;

	return (
		<>
			{expiredTasks.length > NO_EXPIRED_TASKS && mode === TasksMode.CURRENT && (
				<ExpiredTasksModal tasks={expiredTasks} />
			)}
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
					{isLoading ? <Loader /> : renderTaskCards(taskbarTasks)}
				</div>
			</div>
		</>
	);
};

export { Tasks };
