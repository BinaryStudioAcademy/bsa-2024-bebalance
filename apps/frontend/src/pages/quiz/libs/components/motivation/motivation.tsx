import { Button } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	onNext: () => void;
};

const Motivation: React.FC<Properties> = ({ onNext }: Properties) => (
	<div className={styles["page-container"]}>
		<div className={styles["white-dots"]} />
		<div className={styles["border-container"]}>
			<div className={styles["content-container"]}>
				<h1 className={styles["title"]}>Welcome to BeBalance!</h1>
				<div className={styles["text"]}>
					You are on the right path to achieving life balance...
				</div>
				<Button label="Let’s start" onClick={onNext} type="button" />
			</div>
		</div>
	</div>
);

export { Motivation };
