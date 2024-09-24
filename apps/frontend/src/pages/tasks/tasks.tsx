import { Loader, Switch, TaskCard } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { getMillisecondsLeft } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions as taskActions, type TaskDto } from "~/modules/tasks/tasks.js";

import { ExpiredTasksModal } from "./libs/components/components.js";
import { NO_EXPIRED_TASKS } from "./libs/constants/constants.js";
import {
	MillisecondsPerUnit,
	TasksMode,
	TaskStatus,
} from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const Tasks: React.FC = () => {
	const dispatch = useAppDispatch();
	const { activeTasks, dataStatus, expiredTasks, tasks } = useAppSelector(
		({ tasks }) => {
			return {
				activeTasks: tasks.activeTasks,
				dataStatus: tasks.dataStatus,
				expiredTasks: tasks.expiredTasks,
				tasks: tasks.tasks,
			};
		},
	);

	const [mode, setMode] = useState<ValueOf<typeof TasksMode>>(
		TasksMode.CURRENT,
	);

	const handleTaskExpiration = useCallback(
		(expiredTask: TaskDto) => {
			void dispatch(taskActions.addExpiredTask(expiredTask));
		},
		[dispatch],
	);

	useEffect(() => {
		const currentTime = Date.now();
		const expired: TaskDto[] = [];
		const active: TaskDto[] = [];

		for (const task of tasks) {
			const timeToDeadline = getMillisecondsLeft(currentTime, task.dueDate);

			if (timeToDeadline < MillisecondsPerUnit.MINUTE) {
				expired.push(task);
			} else {
				active.push(task);
			}
		}

		void dispatch(taskActions.setActiveTasks(active));
		void dispatch(taskActions.setExpiredTasks(expired));
	}, [tasks, dispatch]);

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

	const handleRenderTaskCards = (tasks: TaskDto[]): JSX.Element[] => {
		return tasks.map((task) => {
			return (
				<TaskCard
					key={task.id}
					onComplete={handleComplete}
					onExpire={handleTaskExpiration}
					onSkip={handleSkip}
					task={task}
				/>
			);
		});
	};

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
					{isLoading ? <Loader /> : handleRenderTaskCards(taskbarTasks)}
				</div>
			</div>
		</>
	);
};

export { Tasks };
