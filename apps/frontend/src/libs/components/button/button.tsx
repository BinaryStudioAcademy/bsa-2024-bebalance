import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	isFluid?: boolean;
	isPrimary?: boolean;
	label: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type?: "button" | "submit";
	variant: "dark" | "secondary";
};

const Button: React.FC<Properties> = ({
	isFluid = false,
	isPrimary = true,
	label,
	onClick,
	type = "button",
}: Properties) => (
	<button
		className={getValidClassNames(
			styles["btn"],
			isFluid && styles["fluid"],
			isPrimary && styles["primary"],
		)}
		onClick={onClick}
		type={type}
	>
		{label}
	</button>
);

export { Button };
