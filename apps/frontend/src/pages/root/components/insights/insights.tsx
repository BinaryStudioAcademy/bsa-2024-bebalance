import { getValidClassNames } from "~/libs/helpers/helpers.js";

import { CircularProgress } from "../circular-progress/circular-progress.js";
import styles from "./styles.module.css";

const Insights: React.FC = () => {
	return (
		<div className={styles["insights-container"]}>
			<div className={styles["balance-insight"]}>
				<span
					className={getValidClassNames(
						styles["balance-value"],
						styles["insight-value"],
					)}
				>
					90%
				</span>
				<span>Balance</span>
			</div>
			<CircularProgress />
			<div className={styles["average-insight"]}>
				<span
					className={getValidClassNames(
						styles["average-value"],
						styles["insight-value"],
					)}
				>
					69.9
				</span>
				<span>Average</span>
			</div>
		</div>
	);
};

export { Insights };
