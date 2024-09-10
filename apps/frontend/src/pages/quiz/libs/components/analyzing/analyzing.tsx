import { Button } from "~/libs/components/components.js";
import { useCallback, useEffect, useState } from "~/libs/hooks/hooks.js";

import { TEXT_ANIMATION_DELAY } from "./libs/constants/constants.js";
import { AnalyzingText } from "./libs/enums/enums.js";
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
		const firstParagraphArray = AnalyzingText.firstParagraph.split(" ");
		const secondParagraphArray = AnalyzingText.secondParagraph.split(" ");

		const firstParagraph = firstParagraphArray.map((word, index) => (
			<span
				className={styles["letter"]}
				key={`${word}-${index.toString()}`}
				style={{
					animationDelay: `${(index * TEXT_ANIMATION_DELAY).toString()}s`,
				}}
			>
				{index === firstParagraphArray.length ? word : `${word} \u00A0`}
			</span>
		));

		const secondParagraph = secondParagraphArray.map((word, index) => {
			const animationDelay =
				firstParagraphArray.length * TEXT_ANIMATION_DELAY +
				index * TEXT_ANIMATION_DELAY;

			return (
				<span
					className={styles["letter"]}
					key={`${word}-${index.toString()}`}
					style={{ animationDelay: `${animationDelay.toString()}s` }}
				>
					{index === secondParagraphArray.length ? word : `${word} \u00A0`}
				</span>
			);
		});

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
