import { useAppSelector } from "~/libs/hooks/hooks.js";

import {
	CategoriesSelector,
	TaskCreationOptions,
} from "./libs/components/components.js";

const ButtonsController: React.FC = () => {
	const buttonsMode = useAppSelector((state) => state.chat.buttonsMode);

	if (buttonsMode === "taskGenerationOptions") {
		return <TaskCreationOptions />;
	}

	if (buttonsMode === "CategoriesCheckbox") {
		return <CategoriesSelector />;
	}

	return null;
};

export { ButtonsController };
