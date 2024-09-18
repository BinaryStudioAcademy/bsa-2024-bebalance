import { Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as taskActions, type TaskDto } from "~/modules/tasks/tasks.js";

import { ExpiredTasksModal, TaskCard } from "./libs/components/components.js";
import { DEADLINE_OVER, NO_EXPIRED_TASKS } from "./libs/constants/constants.js";
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

	useEffect(() => {
		void dispatch(taskActions.getCurrentTasks());
	}, [dispatch]);

	const handleTaskExpiration = useCallback((expiredTask: TaskDto) => {
		setExpiredTasks((previous) => [...previous, expiredTask]);
		setActiveTasks((previous) =>
			previous.filter((task) => task.id !== expiredTask.id),
		);
	}, []);

	const renderExpiredTaskCard = useCallback(
		(task: TaskDto) => <TaskCard key={task.id} task={task} variant="expired" />,
		[],
	);

	useEffect(() => {
		const currentTime = Date.now();
		const expired: TaskDto[] = [];
		const active: TaskDto[] = [];

		for (const task of tasks) {
			const timeToDeadline = getTimeLeft(currentTime, task.dueDate);

			if (timeToDeadline < DEADLINE_OVER) {
				expired.push(task);
			} else {
				active.push(task);
			}
		}

		setExpiredTasks(expired);
		setActiveTasks(active);
	}, [tasks]);

	const isLoading = dataStatus === DataStatus.PENDING;

	return (
		<>
			{expiredTasks.length > NO_EXPIRED_TASKS && (
				<ExpiredTasksModal
					slides={expiredTasks.map((task) => renderExpiredTaskCard(task))}
				/>
			)}
			<h4 className={styles["title"]}>My Tasks</h4>
			<div className={styles["board"]}>
				{isLoading ? (
					<Loader />
				) : (
					activeTasks.map((task) => (
						<TaskCard
							key={task.id}
							onExpire={handleTaskExpiration}
							task={task}
						/>
					))
				)}
			</div>
		</>
	);
};

export { Tasks };
