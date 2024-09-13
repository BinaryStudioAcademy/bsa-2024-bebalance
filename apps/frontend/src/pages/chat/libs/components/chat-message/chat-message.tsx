import {
	BalanceWheelChart,
	QuizCategoriesForm,
} from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	buttonLabels?: string[];
	contentData: { data: number; label: string }[];
	onSubmit?: (() => void) | undefined;
	text: string;
	type: string;
	// type: "wheelAnalysis" | "suggestionButtons" | "categoryInputs" | "taskList";
};

const ChatMessage: React.FC<Properties> = ({
	buttonLabels = [],
	contentData,
	onSubmit,
	text,
	type,
}: Properties) => {
	const renderContent = (): JSX.Element | null => {
		switch (type) {
			case "categoryInputs": {
				return onSubmit ? (
					<QuizCategoriesForm buttonLabel="Select" onSubmit={onSubmit} />
				) : null;
			}

			case "suggestionButtons": {
				return (
					<>
						{buttonLabels.map((button: string) => (
							<button key={button}>{button}</button>
						))}
					</>
				);
			}

			case "wheelAnalysis": {
				return <BalanceWheelChart data={contentData} />;
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
