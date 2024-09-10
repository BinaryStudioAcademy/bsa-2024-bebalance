import { Button } from "~/libs/components/components.js";
import { useCallback, useEffect, useState } from "~/libs/hooks/hooks.js";

import { AnalyzingText, TextAnimationDelay } from "./libs/enums/enums.js";
import { createAnimatedSpans } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	onNext: () => void;
};

type TextElement = {
	firstParagraph: JSX.Element[];
	secondParagraph: JSX.Element[];
};

const Analyzing: React.FC<Properties> = ({ onNext }: Properties) => {
	const [text, setText] = useState<TextElement>({
		firstParagraph: [],
		secondParagraph: [],
	});

	const handleAnimateText = useCallback(() => {
		const firstParagraph = createAnimatedSpans(AnalyzingText.firstParagraph);
		const secondParagraph = createAnimatedSpans(
			AnalyzingText.secondParagraph,
			AnalyzingText.firstParagraph.split(" ").length *
				TextAnimationDelay.DELAY_MULTIPLIER,
		);

		setText({ firstParagraph, secondParagraph });
	}, []);

	useEffect(() => {
		handleAnimateText();
	}, [handleAnimateText]);

	return (
		<div className={styles["page-container"]}>
			<div className={styles["white-dots"]} />
			<div className={styles["border-container"]}>
				<div className={styles["content-container"]}>
					<h1 className={styles["title"]}>We’re Analyzing Your Journey!</h1>
					<div className={styles["text"]}>
						<p>{text.firstParagraph}</p>
						<p>{text.secondParagraph}</p>
					</div>
					<Button label="Let’s continue" onClick={onNext} type="button" />
				</div>
			</div>
		</div>
	);
};

export { Analyzing };
