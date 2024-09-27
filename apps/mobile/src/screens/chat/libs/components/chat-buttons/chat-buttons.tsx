import { useAppSelector } from "~/libs/hooks/hooks";
import { ButtonsMode } from "~/packages/chat/chat";

import {
	AcceptRegenerateTaskButtons,
	CheckBoxButtons,
	ExplainAcceptTaskButtons,
	GenerateTaskButtons,
} from "./libs/components/components";

const ChatButtons: React.FC = () => {
	const buttonsMode = useAppSelector((state) => state.chat.buttonsMode);

	switch (buttonsMode) {
		case ButtonsMode.CHECKBOX: {
			return <CheckBoxButtons />;
		}

		case ButtonsMode.GENERATE_TASK: {
			return <GenerateTaskButtons />;
		}

		case ButtonsMode.EXPLAIN_ACCEPT: {
			return <ExplainAcceptTaskButtons />;
		}

		case ButtonsMode.ACCEPT_REGENERATE: {
			return <AcceptRegenerateTaskButtons />;
		}

		default: {
			return null;
		}
	}
};

export { ChatButtons };
