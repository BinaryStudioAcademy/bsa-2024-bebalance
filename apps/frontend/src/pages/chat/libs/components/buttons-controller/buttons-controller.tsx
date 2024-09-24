import { useAppSelector } from "~/libs/hooks/hooks.js";

import { buttonsModeOption } from "../../enums/enums.js";
import {
	CategoriesSelector,
	SuggestionsCreationOptions,
	SuggestionsManipulationOptions,
} from "./libs/components/components.js";

const ButtonsController: React.FC = () => {
	const buttonsMode = useAppSelector((state) => state.chat.buttonsMode);

	switch (buttonsMode) {
		case buttonsModeOption.SUGGESTIONS_CREATION: {
			return <SuggestionsCreationOptions />;
		}

		case buttonsModeOption.SUGGESTIONS_MANIPULATION: {
			return <SuggestionsManipulationOptions />;
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
