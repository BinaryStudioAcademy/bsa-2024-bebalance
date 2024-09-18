import {
	BalanceWheelChart,
	QuizCategoriesForm,
} from "~/libs/components/components.js";
import { INDEX_ONE, ZERO_INDEX } from "~/libs/enums/enums.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	ChatMessageType,
	type TaskSuggestionRequestDto,
} from "~/modules/chat/chat.js";
// import { type TaskCreateDto } from "~/modules/tasks/tasks.js";

import { handleButtonAction } from "../../helpers/helpers.js";
import { type ChartDataType } from "../../types/types.js";
import { ConfirmationButtons } from "../confirmation-buttons/confirmation-buttons.js";
import { TaskListContainer } from "../task-list-container/task-list-container.js";
import styles from "./styles.module.css";

type Properties = {
	buttonLabels?: string[];
	contentData: {
		chartData: ChartDataType[];
		selectedCategories: TaskSuggestionRequestDto;
	};
	onFormSubmit?: (payload: { categoryIds: number[] }) => void;
	// taskList: TaskCreateDto[];
	text: string;
	type: ValueOf<typeof ChatMessageType>;
};

const ChatMessage: React.FC<Properties> = ({
	buttonLabels = [],
	contentData,
	onFormSubmit,
	// taskList,
	text,
	type,
}: Properties) => {
	const dispatch = useAppDispatch();

	const handleNo = useCallback(() => {
		void handleButtonAction(dispatch, "getCategoryForm");
	}, [dispatch]);

	const handleYes = useCallback(() => {
		void handleButtonAction(
			dispatch,
			"getTasks",
			contentData.selectedCategories,
		);
	}, [dispatch, contentData.selectedCategories]);

	const renderContent = (): JSX.Element | null => {
		switch (type) {
			case ChatMessageType.CATEGORY_FORM: {
				return onFormSubmit ? (
					<QuizCategoriesForm
						buttonLabel={buttonLabels[ZERO_INDEX] ?? ""}
						onSubmit={onFormSubmit}
					/>
				) : null;
			}

			case ChatMessageType.CONFIRMATION_BUTTONS: {
				return (
					<ConfirmationButtons
						handleNo={handleNo}
						handleYes={handleYes}
						noButtonLabel={buttonLabels[INDEX_ONE] || "No"}
						yesButtonLabel={buttonLabels[ZERO_INDEX] || "Yes"}
					/>
				);
			}

			case ChatMessageType.WHEEL_ANALYSIS: {
				return <BalanceWheelChart data={contentData.chartData} />;
			}

			case ChatMessageType.TASK_LIST: {
				return <TaskListContainer />;
			}

			default: {
				return null;
			}
		}
	};

	const content = renderContent();

	return (
		<li className={styles["message-container"]} key={text}>
			<p>{text}</p>
			{content && <div className={styles["content"]}>{content}</div>}
		</li>
	);
};

export { ChatMessage };
