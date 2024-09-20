import React from "react";

import {
	LoaderWrapper,
	PageSwitcher,
	ScreenWrapper,
	ScrollView,
	TaskCard,
	Text,
	View,
} from "~/libs/components/components";
import { DataStatus } from "~/libs/enums/enums";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type ValueOf } from "~/libs/types/types";
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
					<View style={[globalStyles.flex1, styles.switch]}>
						<PageSwitcher
							activeTab={
								mode === TasksMode.CURRENT ? TaskTab.ACTIVE : TaskTab.PAST
							}
							onTabChange={handleModeToggle}
							tabs={[TaskTab.ACTIVE, TaskTab.PAST]}
						/>
					</View>
				</View>
				<ScrollView>
					{tasks.map((task) => (
						<TaskCard
							key={task.id}
							onComplete={handleComplete}
							onSkip={handleSkip}
							task={task}
						/>
					))}
				</ScrollView>
			</LoaderWrapper>
		</ScreenWrapper>
	);
};

export { Tasks };
