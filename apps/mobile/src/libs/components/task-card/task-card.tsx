import React from "react";

import {
	DeadlineCountdown,
	Icon,
	Tag,
	TaskActionButton,
	Text,
	View,
} from "~/libs/components/components";
import { BaseColor, TaskStatus } from "~/libs/enums/enums";
import { useCallback } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type TaskDto } from "~/packages/tasks/tasks";

import { styles } from "./styles";

type Properties = {
	onComplete?: (id: number) => void;
	onSkip?: (id: number) => void;
	task: TaskDto;
};

const EDIT_ICON_SIZE = 20;

const TaskCard: React.FC<Properties> = ({ onComplete, onSkip, task }) => {
	const handleTaskSkip = useCallback(() => {
		onSkip?.(task.id);
	}, [task, onSkip]);

	const handleTaskComplete = useCallback(() => {
		onComplete?.(task.id);
	}, [task, onComplete]);

	const isActiveTask = task.status === TaskStatus.CURRENT;

	const getButtonProperties = (): {
		label: string;
		type: "complete" | "skip";
	} | null => {
		if (task.status === TaskStatus.SKIPPED) {
			return { label: "Skipped", type: "skip" };
		}

		if (task.status === TaskStatus.COMPLETED) {
			return { label: "Completed", type: "complete" };
		}

		return null;
	};

	const buttonProperties = getButtonProperties();

	return (
		<View style={[globalStyles.mb16, globalStyles.mh16, styles.container]}>
			<View
				style={[
					globalStyles.alignItemsCenter,
					globalStyles.flexDirectionRow,
					globalStyles.justifyContentSpaceBetween,
					globalStyles.ph16,
					globalStyles.pt16,
				]}
			>
				<Tag label={task.category} />
				{isActiveTask && <DeadlineCountdown deadline={task.dueDate} />}
			</View>
			<View style={[globalStyles.mt32, globalStyles.pb32, globalStyles.ph16]}>
				<Text preset="subheading" weight="bold">
					{task.label}
				</Text>
				<Text
					color={BaseColor.GRAY}
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
					]}
				>
					<View
						style={[
							globalStyles.justifyContentCenter,
							globalStyles.p4,
							styles.edit,
						]}
					>
						<Icon
							color={BaseColor.BLACK}
							name="edit-note"
							size={EDIT_ICON_SIZE}
						/>
					</View>
					<TaskActionButton
						label="Skip the task"
						onPress={handleTaskSkip}
						type="skip"
					/>
					<TaskActionButton
						label="Mark complete"
						onPress={handleTaskComplete}
						type="complete"
					/>
				</View>
			) : (
				buttonProperties && (
					<View style={[globalStyles.pt16, styles.actions]}>
						<View style={[globalStyles.ph16, styles.label]}>
							<TaskActionButton
								isDisabled
								isLabel
								label={buttonProperties.label}
								type={buttonProperties.type}
							/>
						</View>
					</View>
				)
			)}
		</View>
	);
};

export { TaskCard };
