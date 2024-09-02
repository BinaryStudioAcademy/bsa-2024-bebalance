import { BalanceWheel as BalanceWheelComponent } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const BalanceWheel: React.FC = () => {
	const data = [
		{ data: 9, label: "Physical" },
		{ data: 8, label: "Work" },
		{ data: 7, label: "Friends" },
		{ data: 6, label: "Love" },
		{ data: 5, label: "Money" },
		{ data: 8, label: "Free time" },
		{ data: 5, label: "Spiritual" },
		{ data: 7, label: "Mental" },
	];

	return (
		<div className={styles["container"]}>
			<BalanceWheelComponent data={data} isAnimating />
		</div>
	);
};

export { BalanceWheel };
