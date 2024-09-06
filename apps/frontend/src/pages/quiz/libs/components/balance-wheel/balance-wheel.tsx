import { BalanceWheelChart } from "~/libs/components/components.js";

import { BALANCE_WHEEL_ANIMATED_INITIAL_DATA } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const BalanceWheel: React.FC = () => {
	return (
		<div className={styles["container"]}>
			<BalanceWheelChart
				data={BALANCE_WHEEL_ANIMATED_INITIAL_DATA}
				isAnimating
			/>

			<div className={styles["white-dot"]} />
			<div className={styles["white-dot"]} />
			<div className={styles["white-dot"]} />
			<div className={styles["white-dot"]} />
			<div className={styles["white-dot"]} />
			<div className={styles["white-dot"]} />
		</div>
	);
};

export { BalanceWheel };
