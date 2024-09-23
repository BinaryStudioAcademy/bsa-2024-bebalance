import { TaskCard } from "~/libs/components/components.js";
import { type TaskMessage } from "~/modules/chat/chat.js";

import styles from "./styles.module.css";

type Properties = {
	taskSuggestions: TaskMessage[];
};

const TaskSuggestionsDisplay: React.FC<Properties> = ({
	taskSuggestions,
}: Properties) => {
	return (
		<div className={styles["tasks-grid"]}>
			{taskSuggestions.map((suggestion) => {
				return (
					<TaskCard key={suggestion.task.categoryId} task={suggestion.task} />
				);
			})}
		</div>
	);
};

export { TaskSuggestionsDisplay };
