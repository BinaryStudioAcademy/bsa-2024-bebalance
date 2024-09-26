import React from "react";

import {
	Button,
	ScrollView,
	TaskCard,
	Text,
	View,
} from "~/libs/components/components";
import { NumericalValue, TaskStatus } from "~/libs/enums/enums";
import {
	useAppDispatch,
	useCallback,
	useMemo,
	useWindowDimensions,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type TaskDto } from "~/packages/tasks/tasks";
import { actions as taskActions } from "~/slices/task/task";

import { styles } from "./styles";

type Properties = {
	tasks: TaskDto[];
};

const ExpiredTasksModal: React.FC<Properties> = ({ tasks }) => {
	const { width } = useWindowDimensions();

	const scrollViewWidth = useMemo(() => {
		return tasks.length * width;
	}, [tasks, width]);
	const tasksScrollViewStyle = { width: scrollViewWidth };

	const dispatch = useAppDispatch();

	const handleSkip = useCallback(
		(id: number) => (): void => {
			void dispatch(taskActions.updateTask({ id, status: TaskStatus.SKIPPED }));
		},
		[dispatch],
	);

	const handleComplete = useCallback(
		(id: number) => (): void => {
			void dispatch(
				taskActions.updateTask({ id, status: TaskStatus.COMPLETED }),
			);
		},
		[dispatch],
	);

	const handleExtendDeadline = useCallback(
		(id: number) => (): void => {
			void dispatch(taskActions.updateTaskDeadline(id));
		},
		[dispatch],
	);

	const taskCards = tasks.map((task, index) => {
		const { id } = task;
		const currentPage = index + NumericalValue.ONE;

		return (
			<View
				key={task.id}
				style={[
					globalStyles.flex1,
					globalStyles.gap24,
					globalStyles.ph12,
					globalStyles.pt32,
					globalStyles.pb12,
					styles.container,
				]}
			>
				<Text
					preset="subheading"
					style={[globalStyles.ph12, styles.text]}
					weight="bold"
				>
					The time to complete this task is over
				</Text>
				<TaskCard key={task.id} task={task} variant="expired" />
				<Text style={styles.text}>
					Do you want to extend deadline by 24 hours?
				</Text>
				<View style={globalStyles.gap16}>
					<Button
						label="YES, I WANT TO EXTEND DEADLINE"
						onPress={handleExtendDeadline(id)}
					/>
					<Button
						appearance="outlined"
						label="NO, I WANT TO SKIP THIS TASK"
						onPress={handleSkip(id)}
					/>
					<Button
						appearance="outlined"
						label="I ALREADY COMPLETED THIS TASK"
						onPress={handleComplete(id)}
					/>
				</View>
				{tasks.length > NumericalValue.ONE && (
					<View style={[globalStyles.flex1, globalStyles.justifyContentEnd]}>
						<Text preset="subheading" weight="bold">
							{currentPage}/{tasks.length}
						</Text>
					</View>
				)}
			</View>
		);
	});

	if (tasks.length === NumericalValue.ZERO) {
		return null;
	}

	return (
		<ScrollView
			contentContainerStyle={[
				globalStyles.p16,
				globalStyles.gap32,
				styles.wrapper,
				tasksScrollViewStyle,
			]}
			horizontal
			pagingEnabled
		>
			{taskCards}
		</ScrollView>
	);
};

export { ExpiredTasksModal };
