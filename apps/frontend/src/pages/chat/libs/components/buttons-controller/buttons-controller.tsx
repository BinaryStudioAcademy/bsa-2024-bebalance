import { useAppSelector } from "~/libs/hooks/hooks.js";

import { ButtonsModeOption } from "../../enums/enums.js";
import {
	CategoriesSelector,
	SuggestionsCreationOptions,
	SuggestionsManipulationOptions,
} from "./libs/components/components.js";

const ButtonsController: React.FC = () => {
	const buttonsMode = useAppSelector((state) => state.chat.buttonsMode);

	switch (buttonsMode) {
		case ButtonsModeOption.SUGGESTIONS_CREATION: {
			return <SuggestionsCreationOptions />;
		}

		case ButtonsModeOption.SUGGESTIONS_MANIPULATION: {
			return <SuggestionsManipulationOptions />;
		}

		case ButtonsModeOption.CATEGORIES_CHECKBOX: {
			return <CategoriesSelector />;
		}

		default: {
			return null;
		}
	}
};

export { ButtonsController };