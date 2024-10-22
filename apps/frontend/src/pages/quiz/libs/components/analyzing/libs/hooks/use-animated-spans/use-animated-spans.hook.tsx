import { TextAnimationDelay } from "../../enums/enums.js";
import styles from "./styles.module.css";

const useAnimatedSpans = (
	text: string,
	baseDelay: number = TextAnimationDelay.BASE_DELAY,
): JSX.Element[] => {
	const words = text.split(" ");

	return words.map((word, index) => {
		return (
			<span
				className={styles["word"]}
				key={`${word}-${index.toString()}`}
				style={{
					animationDelay: `${(
						baseDelay +
						index * TextAnimationDelay.DELAY_MULTIPLIER
					).toString()}s`,
				}}
			>
				{word} {"\u00A0"}
			</span>
		);
	});
};

export { useAnimatedSpans };
