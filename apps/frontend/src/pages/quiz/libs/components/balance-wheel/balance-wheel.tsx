import { BalanceWheel as BalanceWheelComponent } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const data = [
	{ data: 11, label: "data1" },
	{ data: 15, label: "data2" },
	{ data: 14, label: "data3" },
	{ data: 17, label: "data4" },
	{ data: 12, label: "data5" },
	{ data: 13, label: "data6" },
	{ data: 16, label: "data7" },
];

const BalanceWheel: React.FC = () => {
	return (
		<div className={styles["container"]}>
			<BalanceWheelComponent data={data} isAnimating />
		</div>
	);
};

export { BalanceWheel };
