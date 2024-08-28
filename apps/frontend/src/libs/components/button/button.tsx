import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	isDisabled?: boolean;
	isFluid?: boolean;
	isPrimary?: boolean;
	label: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type?: "button" | "submit";
	variant: "dark" | "secondary";
};

const Button: React.FC<Properties> = ({
	isDisabled = false,
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
		disabled={isDisabled}
		onClick={onClick}
		type={type}
	>
		{label}
	</button>
);

export { Button };
