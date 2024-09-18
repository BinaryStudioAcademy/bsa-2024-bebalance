import { useEffect, useState } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const ZERO = 0;
const HUNDRED = 100;
const TWO = 2;
const SIXTY = 60;

const CircularProgress: React.FC = () => {
	const [animatedValue, setAnimatedValue] = useState<number>(ZERO);
	const radius = 43;
	const circumference = TWO * Math.PI * radius;
	const strokeDashoffset =
		circumference - (animatedValue / HUNDRED) * circumference;

	useEffect(() => {
		const timer = setTimeout(() => {
			setAnimatedValue(SIXTY);
		}, HUNDRED);

		return (): void => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<div className={styles["container"]}>
			<svg
				className={styles["circles-container"]}
				height="120"
				viewBox="0 0 100 100"
				width="120"
			>
				<circle
					className={styles["outer-circle"]}
					cx="50"
					cy="50"
					fill="transparent"
					r={radius}
					stroke="currentColor"
					strokeWidth="10"
				/>
				<circle
					className={styles["inner-circle"]}
					cx="50"
					cy="50"
					fill="transparent"
					r={radius}
					stroke="currentColor"
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap="round"
					strokeWidth="10"
				/>
			</svg>
			<div className={styles["percentage-wrapper"]}>
				<span className={styles["percentage"]}>66%</span>
				<span className={styles["percentage-title"]}>Completed Tasks</span>
			</div>
		</div>
	);
};

export { CircularProgress };
