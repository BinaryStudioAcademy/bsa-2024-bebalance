import { BalanceWheel as BalanceWheelComponent } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const BalanceWheel: React.FC = () => {
	return (
		<div className={styles["container"]}>
			<BalanceWheelComponent isAnimating />
		</div>
	);
};

export { BalanceWheel };
