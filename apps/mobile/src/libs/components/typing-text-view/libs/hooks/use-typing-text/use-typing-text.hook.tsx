import { useEffect, useState } from "~/libs/hooks/hooks";

type UseTypingTextArguments = {
	content: string;
	firstLetterIndex: number;
	lettersPrintedPerStep: number;
	nextLettersPrintedDelay: number;
	startTypingDelay: number;
};

type UseTypingTextReturnData = {
	hiddenContent: string;
	visibleContent: string;
};

const useTypingText = ({
	content,
	firstLetterIndex,
	lettersPrintedPerStep,
	nextLettersPrintedDelay,
	startTypingDelay,
}: UseTypingTextArguments): UseTypingTextReturnData => {
	const [currentLettersPrinted, setCurrentLettersPrinted] =
		useState<number>(firstLetterIndex);
	const visibleContent = content.slice(firstLetterIndex, currentLettersPrinted);
	const hiddenContent = content.slice(currentLettersPrinted);

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
		hiddenContent,
		visibleContent,
	};
};

export { useTypingText };
