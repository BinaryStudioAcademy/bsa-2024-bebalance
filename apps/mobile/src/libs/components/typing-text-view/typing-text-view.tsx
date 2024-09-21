import React from "react";

import { Text } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";

import { FIRST_LETTER_INDEX } from "./libs/constants/constants";
import { TypingTextAnimation } from "./libs/enums/enums";
import { useTypingText } from "./libs/hooks/hooks";

type Properties = {
	content: string;
	lettersPrintedPerStep?: number;
	maskingColor?: ValueOf<typeof BaseColor>;
	nextLettersPrintedDelay?: number;
	startTypingDelay?: number;
	textColor: ValueOf<typeof BaseColor>;
} & Omit<React.ComponentProps<typeof Text>, "children">;

const TypingTextView: React.FC<Properties> = ({
	content,
	lettersPrintedPerStep = TypingTextAnimation.LETTERS_PRINTED_PER_STEP,
	maskingColor = BaseColor.BG_WHITE,
	nextLettersPrintedDelay = TypingTextAnimation.NEXT_LETTERS_PRINTED_DELAY,
	startTypingDelay = TypingTextAnimation.DEFAULT_START_TYPING_DELAY,
	textColor = BaseColor.BLACK,
	...textProperties
}) => {
	const { hiddenLetters, visibleLetters } = useTypingText({
		content,
		firstLetterIndex: FIRST_LETTER_INDEX,
		lettersPrintedPerStep,
		nextLettersPrintedDelay,
		startTypingDelay,
	});

	return (
		<>
			<Text {...textProperties} color={maskingColor}>
				<Text {...textProperties} color={textColor}>
					{visibleLetters}
				</Text>
				{hiddenLetters}
			</Text>
		</>
	);
};

export { TypingTextView };
