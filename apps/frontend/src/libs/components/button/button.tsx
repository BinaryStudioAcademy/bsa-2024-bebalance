import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type IconName } from "~/libs/types/icon-name.type.js";

import { Icon } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	hasVisuallyHiddenLabel?: boolean;
	iconName?: IconName;
	isFluid?: boolean;
	isPrimary?: boolean;
	label: string;
	onClick?: (() => void) | undefined;
	type: "button" | "submit";
	variant?: "dark" | "icon" | "secondary";
};

const Button: React.FC<Properties> = ({
	hasVisuallyHiddenLabel = false,
	iconName,
	isFluid = false,
	isPrimary = true,
	label,
	onClick,
	type = "button",
	variant,
}: Properties) => (
	<button
		className={getValidClassNames(
			styles["btn"],
			isFluid && styles["fluid"],
			isPrimary && styles["primary"],
			variant && styles[`${variant}-button`],
		)}
		onClick={onClick}
		type={type}
	>
		<span
			className={getValidClassNames(
				hasVisuallyHiddenLabel && "visually-hidden",
			)}
		>
			{label}
		</span>
		{iconName && <Icon name={iconName} />}
	</button>
);

export { Button };
