import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	isFluid?: boolean;
	isPrimary?: boolean;
	label: string;
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	isFluid = false,
	isPrimary = true,
	label,
	type = "button",
}: Properties) => (
	<button
		className={getValidClassNames(
			styles["btn"],
			isFluid && styles["fluid"],
			isPrimary && styles["primary"],
		)}
		type={type}
	>
		{label}
	</button>
);

export { Button };
