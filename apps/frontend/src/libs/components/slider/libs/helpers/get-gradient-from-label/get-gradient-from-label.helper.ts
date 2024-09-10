import {
	DEFAULT_GRADIENT_DEGREE,
	SLIDER_BACKGROUND_COLOR,
} from "../../constants/constants.js";
import { SliderStepGradient } from "../../enums/enums.js";

const getGradientFromLabel = (
	label: string,
): {
	degree: string;
	end: string;
	start: string;
} => {
	const formattedLabel = label
		.toUpperCase()
		.replaceAll(/\s+/g, "_") as keyof typeof SliderStepGradient;

	if (formattedLabel in SliderStepGradient) {
		return {
			degree: SliderStepGradient[formattedLabel].degree,
			end: SliderStepGradient[formattedLabel].end,
			start: SliderStepGradient[formattedLabel].start,
		};
	}

	return {
		degree: DEFAULT_GRADIENT_DEGREE,
		end: SLIDER_BACKGROUND_COLOR,
		start: SLIDER_BACKGROUND_COLOR,
	};
};

export { getGradientFromLabel };
