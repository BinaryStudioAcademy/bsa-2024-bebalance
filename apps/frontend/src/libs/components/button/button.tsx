import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	hasVisuallyHiddenLabel?: boolean;
	icon?: React.ReactNode;
	isFluid?: boolean;
	isPrimary?: boolean;
	label: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type?: "button" | "submit";
	variant: "dark" | "secondary";
};

const Button: React.FC<Properties> = ({
	hasVisuallyHiddenLabel,
	icon,
	isFluid = false,
	isPrimary = true,
	label,
	onClick,
	type = "button",
}: Properties) => (
	<button
		className={getValidClassNames(
			styles["btn"],
			icon && styles["icon"],
			isFluid && styles["fluid"],
			isPrimary && styles["primary"],
		)}
		onClick={onClick}
		type={type}
	>
		{icon}
		{!hasVisuallyHiddenLabel && label}
	</button>
);

export { Button };
