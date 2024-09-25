import React from "react";

import {
	ImageBackground,
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
import { type ImageSourcePropType, type ValueOf } from "~/libs/types/types";
import { type TaskDto } from "~/packages/tasks/tasks";
import { type UserDto } from "~/packages/users/users";
import { actions as taskActions } from "~/slices/task/task";
import { actions as userActions } from "~/slices/users/users";

import { TasksMode, TaskStatus, TaskTab } from "./libs/enums/enums";
import { styles } from "./styles";

const Tasks: React.FC = () => {
	const dispatch = useAppDispatch();

	const authenticatedUser = useAppSelector(({ auth }) => auth.user);
	const { dataStatus, tasks } = useAppSelector(({ tasks }) => tasks);

	const [mode, setMode] = useState<ValueOf<typeof TasksMode>>(
		TasksMode.CURRENT,
	);

	const currentTasks: TaskDto[] = tasks.filter(
		(task) => task.status === TaskStatus.CURRENT,
	);
	const pastTasks: TaskDto[] = tasks.filter(
		(task) => task.status === TaskStatus.COMPLETED,
	);
	const isCurrentEmpty = currentTasks.length === NumericalValue.ZERO;
	const isPastEmpty = pastTasks.length === NumericalValue.ZERO;

	useEffect(() => {
		void dispatch(
			userActions.getById({ id: (authenticatedUser as UserDto).id }),
		);
	}, [dispatch, authenticatedUser]);

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

	return (
		<ScreenWrapper edges={["top", "left", "right"]} style={styles.container}>
			<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
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
				<ImageBackground
					resizeMode="cover"
					source={
						require("~/assets/images/background.png") as ImageSourcePropType
					}
					style={[globalStyles.flex1, styles.backgroundContainer]}
				>
					<View style={[globalStyles.flex1, styles.background]}>
						{(isCurrentEmpty && mode === TasksMode.CURRENT) ||
						(isPastEmpty && mode === TasksMode.PAST) ? (
							<View
								style={[
									globalStyles.flex1,
									globalStyles.alignItemsCenter,
									globalStyles.justifyContentCenter,
								]}
							>
								<Text
									preset="subheading"
									style={[globalStyles.ph32, styles.empty]}
									weight="bold"
								>
									{mode === TasksMode.CURRENT
										? "You don't have any active tasks"
										: "You don't have any completed tasks"}
								</Text>
							</View>
						) : (
							<ScrollView
								showsVerticalScrollIndicator={false}
								style={globalStyles.mt8}
							>
								{tasks.map((task) => (
									<TaskCard
										key={task.id}
										onComplete={handleComplete}
										onSkip={handleSkip}
										task={task}
									/>
								))}
							</ScrollView>
						)}
					</View>
				</ImageBackground>
			</LoaderWrapper>
		</ScreenWrapper>
	);
};

export { Tasks };
