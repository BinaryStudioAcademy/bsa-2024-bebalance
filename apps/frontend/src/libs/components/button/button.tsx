import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type IconName } from "~/libs/types/types.js";

import { Icon } from "../icon/icon.js";
import styles from "./styles.module.css";

type Properties = {
	hasVisuallyHiddenLabel?: boolean;
	iconName?: IconName;
	iconPosition?: "center" | "left" | "right";
	isDisabled?: boolean;
	label: string;
	onClick?: (() => void) | undefined;
	type?: "button" | "submit";
	variant?: "action" | "icon" | "primary" | "secondary";
};

const Button: React.FC<Properties> = ({
	hasVisuallyHiddenLabel = false,
	iconName,
	iconPosition = "right",
	isDisabled = false,
	label,
	onClick,
	type = "button",
	variant = "primary",
}: Properties) => (
	<button
		className={getValidClassNames(
			styles["btn"],
			variant === "icon" && styles[`position-${iconPosition}`],
			styles[`${variant}-button`],
		)}
		disabled={isDisabled}
		onClick={onClick}
		type={type}
	>
		{iconName && <Icon name={iconName} />}
		<span
			className={getValidClassNames(
				hasVisuallyHiddenLabel && "visually-hidden",
				variant === "secondary" && styles["secondary-label"],
			)}
		>
			{label}
		</span>
	</button>
);

export { Button };
