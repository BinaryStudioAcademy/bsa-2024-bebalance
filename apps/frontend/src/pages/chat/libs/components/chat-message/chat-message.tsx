import {
	BalanceWheelChart,
	QuizCategoriesForm,
} from "~/libs/components/components.js";
import { INDEX_ONE, ZERO_INDEX } from "~/libs/enums/enums.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";

import { handleButtonAction } from "../../helpers/helpers.js";
import { ConfirmationButtons } from "../confirmation-buttons/confirmation-buttons.js";
import styles from "./styles.module.css";

type Properties = {
	buttonLabels?: string[];
	contentData: {
		chartData: { data: number; label: string }[];
		selectedCategories: {
			categories: { categoryId: number; categoryName: string }[];
			threadId: string;
		};
	};
	onFormSubmit?: (payload: { categoryIds: number[] }) => void;
	text: string;
	type:
		| "categoryForm"
		| "confirmationButtons"
		| "taskList"
		| "text"
		| "wheelAnalysis";
};

const ChatMessage: React.FC<Properties> = ({
	buttonLabels = [],
	contentData,
	onFormSubmit,
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
			case "categoryForm": {
				return onFormSubmit ? (
					<QuizCategoriesForm
						buttonLabel={buttonLabels[ZERO_INDEX] ?? ""}
						onSubmit={onFormSubmit}
					/>
				) : null;
			}

			case "confirmationButtons": {
				return (
					<ConfirmationButtons
						handleNo={handleNo}
						handleYes={handleYes}
						noButtonLabel={buttonLabels[INDEX_ONE] || "No"}
						yesButtonLabel={buttonLabels[ZERO_INDEX] || "Yes"}
					/>
				);
			}

			case "wheelAnalysis": {
				return <BalanceWheelChart data={contentData.chartData} />;
			}

			case "taskList": {
				return <div>Task list</div>;
			}

			default: {
				return null;
			}
		}
	};

	const content = renderContent();

	return (
		<li className={styles["message-container"]} key={text}>
			{text}
			{content}
		</li>
	);
};

export { ChatMessage };
