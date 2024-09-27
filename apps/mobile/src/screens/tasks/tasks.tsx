import React from "react";

import {
	ExpiredTasksModal,
	FlatList,
	ImageBackground,
	LoaderWrapper,
	PageSwitcher,
	ScreenWrapper,
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
import { type ImageSourcePropType } from "~/libs/types/types";
import { type TaskDto } from "~/packages/tasks/tasks";
import { type UserDto } from "~/packages/users/users";
import { actions as taskActions } from "~/slices/task/task";
import { actions as userActions } from "~/slices/users/users";

import { EmptyTasksHeader } from "./libs/components/components";
import { TaskStatus, TaskTab } from "./libs/enums/enums";
import { getMillisecondsLeft } from "./libs/helpers/helpers";
import { styles } from "./styles";

const MILLISECONDS_PER_MINUTE = 60_000;

const Tasks: React.FC = () => {
	const dispatch = useAppDispatch();

	const authenticatedUser = useAppSelector(({ auth }) => auth.user);
	const { activeTasks, dataStatus, expiredTasks, tasks } = useAppSelector(
		({ tasks }) => tasks,
	);

	const [isCurrentMode, setIsCurrentMode] = useState<boolean>(true);

	const hasExpiredTasks = expiredTasks.length > NumericalValue.ZERO;
	const taskbarTasks = isCurrentMode ? activeTasks : tasks;

	useEffect(() => {
		void dispatch(
			userActions.getById({ id: (authenticatedUser as UserDto).id }),
		);
	}, [dispatch, authenticatedUser]);

	useEffect(() => {
		if (isCurrentMode) {
			void dispatch(taskActions.getCurrentTasks());
		} else {
			void dispatch(taskActions.getPastTasks());
		}
	}, [dispatch, isCurrentMode]);

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
		setIsCurrentMode(!isCurrentMode);
	}, [isCurrentMode]);

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

	const handleRenderTask = useCallback(
		({ item }: { item: TaskDto }) => {
			return (
				<TaskCard
					key={item.id}
					onComplete={handleComplete}
					onExpire={handleExpired}
					onSkip={handleSkip}
					task={item}
				/>
			);
		},
		[handleComplete, handleExpired, handleSkip],
	);

	const handleKeyExtractor = useCallback(
		(item: TaskDto) => item.id.toString(),
		[],
	);

	const emptyTasksComponent = useCallback(() => {
		const content = isCurrentMode
			? "You don't have any active tasks"
			: "You don't have any past tasks";

		return <EmptyTasksHeader content={content} />;
	}, [isCurrentMode]);

	return (
		<ScreenWrapper edges={["top", "left", "right"]} style={styles.container}>
			<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
				{hasExpiredTasks ? (
					<ExpiredTasksModal tasks={expiredTasks} />
				) : (
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
								activeTab={isCurrentMode ? TaskTab.ACTIVE : TaskTab.PAST}
								onTabChange={handleModeToggle}
								style={[globalStyles.flex1, styles.switch]}
								tabs={[TaskTab.ACTIVE, TaskTab.PAST]}
							/>
						</View>
						<ImageBackground
							resizeMode="cover"
							source={
								require("~/assets/images/background.png") as ImageSourcePropType
							}
							style={[globalStyles.flex1, styles.backgroundContainer]}
						>
							<FlatList
								contentContainerStyle={[
									globalStyles.gap8,
									globalStyles.ph16,
									globalStyles.pv24,
								]}
								data={taskbarTasks}
								keyExtractor={handleKeyExtractor}
								ListEmptyComponent={emptyTasksComponent}
								renderItem={handleRenderTask}
							/>
						</ImageBackground>
					</>
				)}
			</LoaderWrapper>
		</ScreenWrapper>
	);
};

export { Tasks };
