import React from "react";

import {
	Deadline,
	Tag,
	TaskActionButton,
	View,
} from "~/libs/components/components";
import { type TaskDto } from "~/packages/tasks/tasks";

import { styles } from "./styles";

type Properties = {
	task: TaskDto;
};

const TaskCard: React.FC<Properties> = ({ task }) => {
	return (
		<View style={styles.container}>
			<View>
				<Tag color="green" label={task.category} />
				<Deadline deadline={task.dueDate} />
			</View>
			<TaskActionButton />
		</View>
	);
};

export { TaskCard };
