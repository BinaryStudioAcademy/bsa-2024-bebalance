import { Text, View } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import {
	fontWeightToFamily,
	presetToTextStyle,
	sizeToTextStyle,
} from "~/libs/maps/maps";
import {
	type StyleProp,
	type TextStyle,
	type ValueOf,
} from "~/libs/types/types";

import {
	DEFAULT_START_TYPING_DELAY,
	FIRST_LETTER_INDEX,
	LETTERS_PRINTED_PER_STEP,
	NEXT_LETTERS_PRINTED_DELAY,
} from "./libs/constants/constants";
import { useTypingText } from "./libs/hooks/hooks";

type Properties = {
	children: string;
	maskingColor?: ValueOf<typeof BaseColor>;
	preset?: keyof typeof presetToTextStyle;
	size?: keyof typeof sizeToTextStyle;
	startTypingDelay?: number;
	style?: StyleProp<TextStyle>;
	textColor: ValueOf<typeof BaseColor>;
	weight?: keyof typeof fontWeightToFamily;
};

const TypingTextView: React.FC<Properties> = ({
	children,
	maskingColor = BaseColor.BG_WHITE,
	preset = "default",
	size,
	startTypingDelay = DEFAULT_START_TYPING_DELAY,
	style,
	textColor = BaseColor.BLACK,
	weight,
}: Properties) => {
	const textStyles: StyleProp<TextStyle> = [
		presetToTextStyle[preset],
		size && sizeToTextStyle[size],
		weight && fontWeightToFamily[weight],
		style,
	];

	const hiddenTextColorStyle = { color: maskingColor };
	const visibleTextColorStyle = { color: textColor };

	const { hiddenLetters, visibleLetters } = useTypingText({
		firstLetterIndex: FIRST_LETTER_INDEX,
		lettersPrintedPerStep: LETTERS_PRINTED_PER_STEP,
		nextLettersPrintedDelay: NEXT_LETTERS_PRINTED_DELAY,
		startTypingDelay,
		text: children,
	});

	return (
		<View>
			<Text style={[textStyles, hiddenTextColorStyle]}>
				<Text style={[textStyles, visibleTextColorStyle]}>
					{visibleLetters}
				</Text>
				{hiddenLetters}
			</Text>
		</View>
	);
};

export { TypingTextView };
