import { BalanceWheelChart } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useEffect, useState } from "~/libs/hooks/hooks.js";

import {
	BALANCE_WHEEL_ANIMATED_INITIAL_DATA,
	INDEX_NOT_FOUND,
} from "./libs/constants/constants.js";
import { PercentageConfig } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const BalanceWheel: React.FC = () => {
	const [percentage, setPercentage] = useState<number>(
		PercentageConfig.DEFAULT_VALUE,
	);

	const handleUpdatePercentage = useCallback(() => {
		setPercentage((previousPercentage) => {
			if (previousPercentage >= PercentageConfig.MAX_VALUE) {
				return previousPercentage;
			}

			const nextIndex = PercentageConfig.PERCENTAGE_VALUES.findIndex(
				(value) => value > previousPercentage,
			);

			if (nextIndex === INDEX_NOT_FOUND) {
				return PercentageConfig.MAX_VALUE;
			}

			return (
				PercentageConfig.PERCENTAGE_VALUES[nextIndex] ||
				PercentageConfig.MAX_VALUE
			);
		});
	}, []);

	useEffect(() => {
		const intervalId = setInterval(
			handleUpdatePercentage,
			PercentageConfig.PERCENTAGE_INCREASE_INTERVAL,
		);

		return (): void => {
			clearInterval(intervalId);
		};
	}, [handleUpdatePercentage]);

	return (
		<div className={styles["container"]}>
			<div className={styles["border-container"]} />
			<div className={styles["white-dots"]} />
			<div
				className={getValidClassNames(
					styles["circle-gradient"],
					styles["circle-1"],
				)}
			/>
			<div
				className={getValidClassNames(
					styles["circle-gradient"],
					styles["circle-2"],
				)}
			/>
			<div
				className={getValidClassNames(
					styles["circle-gradient"],
					styles["circle-3"],
				)}
			/>

			<BalanceWheelChart
				data={BALANCE_WHEEL_ANIMATED_INITIAL_DATA}
				isAnimating
			/>
			<span className={styles["text"]}>Analyzing {percentage}%</span>
		</div>
	);
};

export { BalanceWheel };
