import { TaskCard } from "~/libs/components/components.js";
import { NumericalValue } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type TaskMessage } from "~/modules/chat/chat.js";

import styles from "./styles.module.css";

type Properties = {
	taskSuggestions: TaskMessage[];
};

const TaskSuggestionsDisplay: React.FC<Properties> = ({
	taskSuggestions,
}: Properties) => {
	const hasMultipleSuggestions = taskSuggestions.length > NumericalValue.ONE;
	const tasksGridStyle = getValidClassNames(
		hasMultipleSuggestions ? styles["tasks-grid"] : "",
	);

	return (
		<div className={tasksGridStyle}>
			{taskSuggestions.map((suggestion) => {
				return (
					<TaskCard key={suggestion.task.categoryId} task={suggestion.task} />
				);
			})}
		</div>
	);
};

export { TaskSuggestionsDisplay };
