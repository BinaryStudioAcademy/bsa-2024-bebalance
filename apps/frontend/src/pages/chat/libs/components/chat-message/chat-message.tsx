import {
	BalanceWheelChart,
	QuizCategoriesForm,
} from "~/libs/components/components.js";
import { NumericalValue } from "~/libs/enums/enums.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	ChatMessageType,
	type SelectedCategories,
} from "~/modules/chat/chat.js";

import { handleButtonAction } from "../../helpers/helpers.js";
import { type ChartDataType } from "../../types/types.js";
import { ChatButtons } from "../confirmation-buttons/confirmation-buttons.js";
import { TaskListContainer } from "../task-list-container/task-list-container.js";
import styles from "./styles.module.css";

type Properties = {
	buttonLabels?: string[];
	contentData: {
		chartData: ChartDataType[];
		selectedCategories: SelectedCategories[];
	};
	onFormSubmit?: (categoryIds: number[]) => void;
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
		void handleButtonAction(dispatch, "getTasks");
	}, [dispatch]);

	const renderContent = (): JSX.Element | null => {
		switch (type) {
			case ChatMessageType.CATEGORY_FORM: {
				return onFormSubmit ? (
					<QuizCategoriesForm
						buttonLabel={buttonLabels[NumericalValue.ZERO] ?? ""}
						onSubmit={onFormSubmit}
					/>
				) : null;
			}

			case ChatMessageType.CONFIRMATION_BUTTONS: {
				return (
					<ChatButtons
						handleNo={handleNo}
						handleYes={handleYes}
						noButtonLabel={buttonLabels[NumericalValue.ONE] || "No"}
						yesButtonLabel={buttonLabels[NumericalValue.ZERO] || "Yes"}
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
