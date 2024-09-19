import React from "react";

import {
	Deadline,
	Tag,
	TaskActionButton,
	View,
} from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";
import { type TaskDto } from "~/packages/tasks/tasks";

import { styles } from "./styles";

type Properties = {
	task: TaskDto;
};

const TaskCard: React.FC<Properties> = ({ task }) => {
	return (
		<View
			style={[
				globalStyles.mh16,
				globalStyles.ph24,
				globalStyles.pv16,
				styles.container,
			]}
		>
			<View
				style={[
					globalStyles.flexDirectionRow,
					globalStyles.alignItemsCenter,
					globalStyles.justifyContentSpaceBetween,
				]}
			>
				<Tag color="green" label={task.category} />
				<Deadline deadline={task.dueDate} />
			</View>
			<TaskActionButton />
		</View>
	);
};

export { TaskCard };
