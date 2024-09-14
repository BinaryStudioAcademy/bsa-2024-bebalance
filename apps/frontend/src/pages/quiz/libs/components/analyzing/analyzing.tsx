import { Button } from "~/libs/components/components.js";

import { AnalyzingText, TextAnimationDelay } from "./libs/enums/enums.js";
import { useAnimatedSpans } from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

type Properties = {
	onNext: () => void;
};

const Analyzing: React.FC<Properties> = ({ onNext }: Properties) => {
	const secondParagraphDelay =
		AnalyzingText.firstParagraph.split(" ").length *
		TextAnimationDelay.DELAY_MULTIPLIER;

	const firstParagraph = useAnimatedSpans(AnalyzingText.firstParagraph);
	const secondParagraph = useAnimatedSpans(
		AnalyzingText.secondParagraph,
		secondParagraphDelay,
	);

	return (
		<div className={styles["page-container"]}>
			<div className={styles["white-dots"]} />
			<div className={styles["border-container"]}>
				<div className={styles["content-container"]}>
					<h1 className={styles["title"]}>We’re Analyzing Your Journey!</h1>
					<div className={styles["text"]}>
						<p>{firstParagraph}</p>
						<p>{secondParagraph}</p>
					</div>
					<Button label="Let’s continue" onClick={onNext} type="button" />
				</div>
			</div>
		</div>
	);
};

export { Analyzing };
