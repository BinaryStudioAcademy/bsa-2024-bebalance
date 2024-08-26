import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	children?: React.ReactNode;
	isFluid?: boolean;
	isIconButton?: boolean;
	isPrimary?: boolean;
	label?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type: "button" | "submit";
	variant?: "dark" | "secondary";
};

const Button: React.FC<Properties> = ({
	children,
	isFluid = false,
	isIconButton = false,
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
			isIconButton && styles["icon-button"],
		)}
		onClick={onClick}
		type={type}
	>
		{label}
		{children}
	</button>
);

export { Button };
