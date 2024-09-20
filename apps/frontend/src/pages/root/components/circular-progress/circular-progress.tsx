import { useEffect, useState } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const TOTAL_PERCENTAGE = 100;

type Properties = {
	percentage: number;
};

const CircularProgress: React.FC<Properties> = ({ percentage }: Properties) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const RADIUS = 90;
	const circumference = Math.PI * RADIUS;
	const offset =
		circumference - (percentage / TOTAL_PERCENTAGE) * circumference;

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, TOTAL_PERCENTAGE);

		return (): void => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<div className={styles["container"]}>
			<svg height="90" viewBox="0 0 200 100" width="150">
				<path
					className={styles["outer-circle"]}
					d="M20 100 A80 80 0 0 1 180 100"
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeWidth="20"
				/>
				<path
					className={styles["second-path"]}
					d="M20 100 A80 80 0 0 1 180 100"
					fill="none"
					stroke="currentColor"
					strokeDasharray={circumference}
					strokeDashoffset={isVisible ? offset : circumference}
					strokeLinecap="round"
					strokeWidth="20"
				/>
			</svg>
			<div className={styles["percentage-wrapper"]}>
				<p className={styles["percentage"]}>
					{percentage}
					<span className={styles["percent-symbol"]}>%</span>
				</p>
				<span className={styles["percentage-title"]}>Completed Tasks</span>
			</div>
		</div>
	);
};

export { CircularProgress };
