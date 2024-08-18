import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";

const CIRCUMFERENCE_MULTIPLIER = 2;
const CIRCLE_RADIUS = 45;
const STROKE_DASHARRAY = CIRCUMFERENCE_MULTIPLIER * Math.PI * CIRCLE_RADIUS;
const INITIAL_PROGRESS = 0;
const PROGRESS_STEP = 10;
const MAX_PROGRESS = 100;
const INTERVAL_DURATION = 100;

const Loader: React.FC = () => {
	const [progress, setProgress] = useState(INITIAL_PROGRESS);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((previous) => {
				return previous < MAX_PROGRESS
					? previous + PROGRESS_STEP
					: MAX_PROGRESS;
			});
		}, INTERVAL_DURATION);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className={styles["loaderContainer"]}>
			<div className={styles["loader"]}>
				<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="100%">
							<stop offset="0%" stopColor="#C3FF19" />
							<stop offset="100%" stopColor="#69FF35" />
						</linearGradient>
					</defs>
					<circle className={styles["track"]} cx="60" cy="60" r="45" />
					<circle
						className={styles["progressCircle"]}
						cx="60"
						cy="60"
						r="45"
						style={{
							strokeDashoffset:
								STROKE_DASHARRAY - (progress / MAX_PROGRESS) * STROKE_DASHARRAY,
						}}
					/>
					<text
						className={styles["progressText"]}
						dy=".3em"
						transform="rotate(90 60 60)"
						x="50%"
						y="50%"
					>
						{progress}%
					</text>
				</svg>
			</div>
			<div className={styles["statusText"]}>Analyzing</div>
		</div>
	);
};

export { Loader };
