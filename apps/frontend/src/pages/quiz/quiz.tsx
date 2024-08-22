import lifeBalanceWheel from "~/assets/img/life-balance-wheel.svg";
import { Button } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const Quiz: React.FC = () => {
	return (
		<div className={styles["container"]}>
			<div className={styles["introduction"]}>
				<h1 className={styles["header"]}>
					Craft your personal Life Balance Wheel!
				</h1>

				<img
					alt="Life Balance Wheel"
					className={styles["wheel-img"]}
					src={lifeBalanceWheel}
				/>

				<p className={styles["text"]}>
					Answer a few questions to find out which areas of your life are
					outstanding and which areas you are missing out on
				</p>

				<div className={styles["btn"]}>
					<Button isFluid label="CONTINUE" type="button" />
				</div>
			</div>
		</div>
	);
};

export { Quiz };
