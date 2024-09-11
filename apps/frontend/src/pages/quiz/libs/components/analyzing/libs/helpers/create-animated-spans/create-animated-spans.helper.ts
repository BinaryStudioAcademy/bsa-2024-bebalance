import React from "react";

import { TextAnimationDelay } from "../../enums/enums.js";
import styles from "./styles.module.css";

const createAnimatedSpans = (
	text: string,
	baseDelay: number = TextAnimationDelay.BASE_DELAY,
): React.ReactNode[] => {
	const words = text.split(" ");

	return words.map((word, index) =>
		React.createElement(
			"span",
			{
				className: styles["word"],
				key: `${word}-${index.toString()}`,
				style: {
					animationDelay: `${(baseDelay + index * TextAnimationDelay.DELAY_MULTIPLIER).toString()}s`,
				},
			},
			`${word} \u00A0`,
		),
	);
};

export { createAnimatedSpans };
