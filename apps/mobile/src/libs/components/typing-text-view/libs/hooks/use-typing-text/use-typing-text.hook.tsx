import { useEffect, useState } from "~/libs/hooks/hooks";

type UseTypingTextApruments = {
	content: string;
	firstLetterIndex: number;
	lettersPrintedPerStep: number;
	nextLettersPrintedDelay: number;
	startTypingDelay: number;
};

type UseTypingTextReturnData = {
	hiddenLetters: string;
	visibleLetters: string;
};

const useTypingText = ({
	content,
	firstLetterIndex,
	lettersPrintedPerStep,
	nextLettersPrintedDelay,
	startTypingDelay,
}: UseTypingTextApruments): UseTypingTextReturnData => {
	const [currentLettersPrinted, setCurrentLettersPrinted] =
		useState<number>(firstLetterIndex);
	const visibleLetters = content.slice(firstLetterIndex, currentLettersPrinted);
	const hiddenLetters = content.slice(currentLettersPrinted);

	useEffect(() => {
		if (currentLettersPrinted >= content.length) {
			return;
		}

		const delay =
			currentLettersPrinted === firstLetterIndex
				? startTypingDelay
				: nextLettersPrintedDelay;
		const timer = setTimeout(() => {
			setCurrentLettersPrinted(currentLettersPrinted + lettersPrintedPerStep);
		}, delay);

		return (): void => {
			clearTimeout(timer);
		};
	}, [
		content,
		currentLettersPrinted,
		startTypingDelay,
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
