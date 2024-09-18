import { useEffect, useState } from "~/libs/hooks/hooks";

type UseTypingTextApruments = {
	firstLetterIndex: number;
	lettersPrintedPerStep: number;
	nextLettersPrintedDelay: number;
	startTypingDelay: number;
	text: string;
};

type UseTypingTextReturnData = {
	hiddenLetters: string;
	visibleLetters: string;
};

const useTypingText = ({
	firstLetterIndex,
	lettersPrintedPerStep,
	nextLettersPrintedDelay,
	startTypingDelay,
	text,
}: UseTypingTextApruments): UseTypingTextReturnData => {
	const [currentLettersPrinted, setCurrentLettersPrinted] =
		useState<number>(firstLetterIndex);
	const visibleLetters = text.slice(firstLetterIndex, currentLettersPrinted);
	const hiddenLetters = text.slice(currentLettersPrinted);

	useEffect(() => {
		if (currentLettersPrinted < text.length) {
			if (currentLettersPrinted === firstLetterIndex) {
				setTimeout(() => {
					setCurrentLettersPrinted(
						currentLettersPrinted + lettersPrintedPerStep,
					);
				}, startTypingDelay);
			} else {
				setTimeout(() => {
					setCurrentLettersPrinted(
						currentLettersPrinted + lettersPrintedPerStep,
					);
				}, nextLettersPrintedDelay);
			}
		}
	}, [
		currentLettersPrinted,
		startTypingDelay,
		text,
		firstLetterIndex,
		lettersPrintedPerStep,
		nextLettersPrintedDelay,
	]);

	return {
		hiddenLetters,
		visibleLetters,
	};
};

export { useTypingText };
