import { useAppSelector } from "~/libs/hooks/hooks.js";

import { buttonsModeOption } from "../../enums/enums.js";
import {
	CategoriesSelector,
	TaskCreationOptions,
} from "./libs/components/components.js";

const ButtonsController: React.FC = () => {
	const buttonsMode = useAppSelector((state) => state.chat.buttonsMode);

	switch (buttonsMode) {
		case buttonsModeOption.TASK_CREATION: {
			return <TaskCreationOptions />;
		}

		case buttonsModeOption.CATEGORIES_CHECKBOX: {
			return <CategoriesSelector />;
		}

		default: {
			return null;
		}
	}
};

export { ButtonsController };
