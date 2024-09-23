import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	onClick: () => void;
	variant?: "left" | "right";
};

const ArrowButton: React.FC<Properties> = ({
	onClick,
	variant = "left",
}: Properties) => {
	return (
		<button className={styles["control"]} onClick={onClick}>
			<div
				className={getValidClassNames(
					styles["arrow"],
					styles[`arrow-${variant}`],
				)}
			/>
		</button>
	);
};

export { ArrowButton };
