import { BalanceWheel as BalanceWheelComponent } from "~/libs/components/components.js";

import { balanceWheelData } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const BalanceWheel: React.FC = () => {
	return (
		<div className={styles["container"]}>
			<BalanceWheelComponent data={balanceWheelData} isAnimating />
		</div>
	);
};

export { BalanceWheel };
