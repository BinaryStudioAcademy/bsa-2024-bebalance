import { Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as taskActions } from "~/modules/tasks/tasks.js";

import { ExpiredTasksSlider, TaskCard } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Tasks: React.FC = () => {
	const dispatch = useAppDispatch();
	const { dataStatus, tasks } = useAppSelector(({ tasks }) => {
		return {
			dataStatus: tasks.dataStatus,
			tasks: tasks.tasks,
		};
	});

	useEffect(() => {
		void dispatch(taskActions.getCurrentTasks());
	}, [dispatch]);

	const isLoading = dataStatus === DataStatus.PENDING;

	return (
		<>
			<ExpiredTasksSlider
				slides={tasks.map((task) => (
					<TaskCard key={task.id} task={task} />
				))}
			/>
			<h4 className={styles["title"]}>My Tasks</h4>
			<div className={styles["board"]}>
				{isLoading ? (
					<Loader />
				) : (
					tasks.map((task) => <TaskCard key={task.id} task={task} />)
				)}
			</div>
		</>
	);
};

export { Tasks };
