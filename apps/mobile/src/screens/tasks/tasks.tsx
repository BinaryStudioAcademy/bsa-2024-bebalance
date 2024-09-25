import notifee from "@notifee/react-native";
import React from "react";

import {
	ExpiredTasksModal,
	LoaderWrapper,
	PageSwitcher,
	ScreenWrapper,
	ScrollView,
	TaskCard,
	Text,
	View,
} from "~/libs/components/components";
import { DataStatus, NumericalValue } from "~/libs/enums/enums";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type ValueOf } from "~/libs/types/types";
import { type TaskDto } from "~/packages/tasks/tasks";
import { type UserDto } from "~/packages/users/users";
import { actions as taskActions } from "~/slices/task/task";
import { actions as userActions } from "~/slices/users/users";

import { TasksMode, TaskStatus, TaskTab } from "./libs/enums/enums";
import {
	addNotificationsOnTasksExpired,
	getMillisecondsLeft,
} from "./libs/helpers/helpers";
import { styles } from "./styles";

const MILLISECONDS_PER_MINUTE = 60_000;

const Tasks: React.FC = () => {
	const dispatch = useAppDispatch();

	const authenticatedUser = useAppSelector(({ auth }) => auth.user);
	const { activeTasks, dataStatus, expiredTasks, tasks } = useAppSelector(
		({ tasks }) => tasks,
	);

	const [mode, setMode] = useState<ValueOf<typeof TasksMode>>(
		TasksMode.CURRENT,
	);

	const hasExpiredTasks = expiredTasks.length > NumericalValue.ZERO;
	const taskbarTasks = mode === TasksMode.CURRENT ? activeTasks : tasks;

	useEffect(() => {
		void dispatch(
			userActions.getById({ id: (authenticatedUser as UserDto).id }),
		);
	}, [dispatch, authenticatedUser]);

	useEffect(() => {
		void dispatch(taskActions.getCurrentTasks());
	}, [dispatch]);

	useEffect(() => {
		void addNotificationsOnTasksExpired(activeTasks);

		return (): void => {
			void notifee.cancelAllNotifications();
		};
	}, [activeTasks]);

	useEffect(() => {
		if (mode === TasksMode.CURRENT) {
			void dispatch(taskActions.getCurrentTasks());
		}

		if (mode === TasksMode.PAST) {
			void dispatch(taskActions.getPastTasks());
		}
	}, [dispatch, mode]);

	useEffect(() => {
		const currentTime = Date.now();
		const expired: TaskDto[] = [];
		const active: TaskDto[] = [];

		for (const task of tasks) {
			const { dueDate, status } = task;
			const timeToDeadline = getMillisecondsLeft(currentTime, dueDate);

			if (
				timeToDeadline < MILLISECONDS_PER_MINUTE &&
				status === TaskStatus.CURRENT
			) {
				expired.push(task);
			} else {
				active.push(task);
			}
		}

		void dispatch(taskActions.setActiveTasks(active));
		void dispatch(taskActions.setExpiredTasks(expired));
	}, [tasks, dispatch]);

	const handleModeToggle = useCallback(() => {
		setMode((previousState) => {
			return previousState === TasksMode.CURRENT
				? TasksMode.PAST
				: TasksMode.CURRENT;
		});
	}, []);

	const handleSkip = useCallback(
		(id: number): void => {
			void dispatch(taskActions.updateTask({ id, status: TaskStatus.SKIPPED }));
		},
		[dispatch],
	);

	const handleComplete = useCallback(
		(id: number): void => {
			void dispatch(
				taskActions.updateTask({ id, status: TaskStatus.COMPLETED }),
			);
		},
		[dispatch],
	);

	const handleExpired = useCallback(
		(expiredTask: TaskDto) => {
			void dispatch(taskActions.addExpiredTask(expiredTask));
		},
		[dispatch],
	);

	return (
		<ScreenWrapper edges={["top", "left", "right"]} style={styles.container}>
			<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
				<ExpiredTasksModal tasks={expiredTasks} />
				{!hasExpiredTasks && (
					<>
						<View
							style={[
								globalStyles.flexDirectionRow,
								globalStyles.alignItemsCenter,
								globalStyles.justifyContentSpaceBetween,
								globalStyles.ph16,
								globalStyles.pb8,
							]}
						>
							<Text preset="subheading" weight="bold">
								My Tasks
							</Text>
							<PageSwitcher
								activeTab={
									mode === TasksMode.CURRENT ? TaskTab.ACTIVE : TaskTab.PAST
								}
								onTabChange={handleModeToggle}
								style={[globalStyles.flex1, styles.switch]}
								tabs={[TaskTab.ACTIVE, TaskTab.PAST]}
							/>
						</View>
						<ScrollView
							contentContainerStyle={[globalStyles.gap8, globalStyles.p16]}
						>
							{taskbarTasks.map((task) => (
								<TaskCard
									key={task.id}
									onComplete={handleComplete}
									onExpire={handleExpired}
									onSkip={handleSkip}
									task={task}
								/>
							))}
						</ScrollView>
					</>
				)}
			</LoaderWrapper>
		</ScreenWrapper>
	);
};

export { Tasks };
