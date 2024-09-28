import React from "react";

import {
	DeadlineCountdown,
	Tag,
	TaskActionButton,
	TaskStatusLabel,
	Text,
	View,
} from "~/libs/components/components";
import { BaseColor, TaskStatus } from "~/libs/enums/enums";
import { getStatusProperties } from "~/libs/helpers/helpers";
import { useCallback, useMemo } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type TaskDto } from "~/packages/tasks/tasks";

import { styles } from "./styles";

type Properties = {
	onComplete?: (id: number) => void;
	onExpire?: (task: TaskDto) => void;
	onSkip?: (id: number) => void;
	task: TaskDto;
	variant?: "active" | "expired";
};

const NUMBER_OF_LINES = 3;

const TaskCard: React.FC<Properties> = ({
	onComplete,
	onExpire,
	onSkip,
	task,
	variant = "active",
}) => {
	const handleTaskSkip = useCallback(() => {
		onSkip?.(task.id);
	}, [task, onSkip]);

	const handleTaskComplete = useCallback(() => {
		onComplete?.(task.id);
	}, [task, onComplete]);

	const isActiveTask = task.status === TaskStatus.CURRENT;
	const isExpired = variant === "expired";
	const taskStyle = isExpired ? styles.expired : styles.active;
	const actionsBorderTopStyle = isExpired
		? styles.actionsDisabled
		: styles.actionsActive;

	const statusProperties = useMemo(
		() => getStatusProperties(task.status),
		[task.status],
	);

	const handleExpiredTask = useCallback(() => {
		onExpire?.(task);
	}, [onExpire, task]);

	return (
		<View style={[styles.container, taskStyle]}>
			<View
				style={[
					globalStyles.alignItemsCenter,
					globalStyles.flexDirectionRow,
					globalStyles.justifyContentSpaceBetween,
					globalStyles.ph16,
					globalStyles.pt16,
				]}
			>
				<Tag label={task.categoryName} />
				{isActiveTask && (
					<DeadlineCountdown
						deadline={task.dueDate}
						isExpired={isExpired}
						onExpire={handleExpiredTask}
					/>
				)}
			</View>
			<View style={[globalStyles.mt32, globalStyles.pb24, globalStyles.ph16]}>
				<Text preset="subheading" weight="bold">
					{task.label}
				</Text>
				<Text
					color={BaseColor.GRAY}
					ellipsizeMode="tail"
					numberOfLines={NUMBER_OF_LINES}
					preset="regular"
					style={styles.description}
					weight="regular"
				>
					{task.description}
				</Text>
			</View>
			{isActiveTask ? (
				<View
					style={[
						globalStyles.alignItemsCenter,
						globalStyles.flexDirectionRow,
						globalStyles.justifyContentSpaceBetween,
						globalStyles.ph16,
						globalStyles.pt16,
						styles.actions,
						actionsBorderTopStyle,
					]}
				>
					<TaskActionButton
						isDisabled={isExpired}
						label="Skip the task"
						onPress={handleTaskSkip}
						type="skip"
					/>
					<TaskActionButton
						isDisabled={isExpired}
						label="Mark complete"
						onPress={handleTaskComplete}
						type="complete"
					/>
				</View>
			) : (
				statusProperties && (
					<View
						style={[globalStyles.pt16, styles.actions, actionsBorderTopStyle]}
					>
						<TaskStatusLabel
							label={statusProperties.label}
							type={statusProperties.type}
						/>
					</View>
				)
			)}
		</View>
	);
};

export { TaskCard };
