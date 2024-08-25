import LifeBalanceWheel from "~/assets/img/life-balance-wheel.svg?react";
import RippleEffectBg from "~/assets/img/ripple-effect-bg.svg?react";
import RippleEffectBg2 from "~/assets/img/ripple-effect-bg2.svg?react";
import { Button } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	onNext: () => void;
};

const Introduction: React.FC<Properties> = ({ onNext }: Properties) => {
	return (
		<div className={styles["container"]}>
			<div className={styles["introduction"]}>
				<h1 className={styles["header"]}>
					Craft your personal Life Balance Wheel!
				</h1>
				<LifeBalanceWheel className={styles["wheel-img"]} />
				<p className={styles["text"]}>
					Answer a few questions to find out which areas of your life are
					outstanding and which areas you are missing out on
				</p>
				<div className={styles["btn"]}>
					<Button
						isFluid
						label="CONTINUE"
						onClick={onNext}
						type="button"
						variant="dark"
					/>
				</div>
			</div>
			<RippleEffectBg className={styles["ripple-effect__background1"]} />
			<RippleEffectBg2 className={styles["ripple-effect__background2"]} />
			<div className={styles["circle-gradient1"]} />
			<div className={styles["circle-gradient2"]} />
		</div>
	);
};

export { Introduction };
