import { BalanceWheelChart } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useEffect, useState } from "~/libs/hooks/hooks.js";

import {
	BALANCE_WHEEL_ANIMATED_INITIAL_DATA,
	PERCENTAGE_INCREASE_INTERVAL,
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

			const newPercentage =
				previousPercentage + PercentageConfig.INCREMENT_VALUE;

			return newPercentage > PercentageConfig.MAX_VALUE
				? PercentageConfig.MAX_VALUE
				: newPercentage;
		});
	}, []);

	useEffect(() => {
		const intervalId = setInterval(
			handleUpdatePercentage,
			PERCENTAGE_INCREASE_INTERVAL,
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
