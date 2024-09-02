import { BalanceWheelChart } from "~/libs/components/components.js";

import { BALANCE_WHEEL_DATA } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const BalanceWheel: React.FC = () => {
	return (
		<div className={styles["container"]}>
			<BalanceWheelChart data={BALANCE_WHEEL_DATA} isAnimating />
		</div>
	);
};

export { BalanceWheel };
