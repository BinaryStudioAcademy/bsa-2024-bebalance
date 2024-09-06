import { BalanceWheelChart } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";

import { BALANCE_WHEEL_ANIMATED_INITIAL_DATA } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const BalanceWheel: React.FC = () => {
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
		</div>
	);
};

export { BalanceWheel };
