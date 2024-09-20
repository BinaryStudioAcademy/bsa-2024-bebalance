import { Tag, Text, View } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";
import { type TaskMessage } from "~/packages/chat/chat";

import { styles } from "./styles";

type Properties = {
	tasks: TaskMessage[];
};

const NUMBER_OF_TEXT_LINES = 3;

const AiTask: React.FC<Properties> = ({ tasks }: Properties) => {
	return (
		<>
			{tasks.map(({ task }) => {
				return (
					<View
						key={task.label}
						style={[globalStyles.p16, globalStyles.mb16, styles.container]}
					>
						<Tag label={task.categoryName} />
						<Text size="md" style={globalStyles.mv8} weight="bold">
							{task.label}
						</Text>
						<Text
							color={BaseColor.DARK_GRAY}
							numberOfLines={NUMBER_OF_TEXT_LINES}
							size="sm"
						>
							{task.description}
						</Text>
					</View>
				);
			})}
		</>
	);
};

export { AiTask };
