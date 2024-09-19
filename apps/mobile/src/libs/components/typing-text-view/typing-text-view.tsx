import { Fragment } from "react";

import { Text } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import { type ComponentProps, type ValueOf } from "~/libs/types/types";

import {
	DEFAULT_START_TYPING_DELAY,
	FIRST_LETTER_INDEX,
	LETTERS_PRINTED_PER_STEP,
	NEXT_LETTERS_PRINTED_DELAY,
} from "./libs/constants/constants";
import { useTypingText } from "./libs/hooks/hooks";

type Properties = {
	children: string;
	lettersPrintedPerStep?: number;
	maskingColor?: ValueOf<typeof BaseColor>;
	nextLettersPrintedDelay?: number;
	startTypingDelay?: number;
	textColor: ValueOf<typeof BaseColor>;
} & ComponentProps<typeof Text>;

const TypingTextView: React.FC<Properties> = ({
	children,
	lettersPrintedPerStep = LETTERS_PRINTED_PER_STEP,
	maskingColor = BaseColor.BG_WHITE,
	nextLettersPrintedDelay = NEXT_LETTERS_PRINTED_DELAY,
	startTypingDelay = DEFAULT_START_TYPING_DELAY,
	textColor = BaseColor.BLACK,
	...textProperties
}: Properties) => {
	const { hiddenLetters, visibleLetters } = useTypingText({
		firstLetterIndex: FIRST_LETTER_INDEX,
		lettersPrintedPerStep,
		nextLettersPrintedDelay,
		startTypingDelay,
		text: children,
	});

	return (
		<Fragment>
			<Text {...textProperties} color={maskingColor}>
				<Text {...textProperties} color={textColor}>
					{visibleLetters}
				</Text>
				{hiddenLetters}
			</Text>
		</Fragment>
	);
};

export { TypingTextView };
