import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type IconName } from "~/libs/types/types.js";

import { Icon } from "../icon/icon.js";
import styles from "./styles.module.css";

type Properties = {
	hasVisuallyHiddenLabel?: boolean;
	iconColor?: string | undefined;
	iconName?: IconName;
	iconPosition?: "center" | "left" | "right";
	isDisabled?: boolean;
	isSelected?: boolean;
	label: string;
	labelVariant?: "light" | "primary";
	onClick?: (() => void) | undefined;
	type?: "button" | "submit";
	variant?: "action" | "icon" | "primary" | "secondary" | "switch";
};

const Button: React.FC<Properties> = ({
	hasVisuallyHiddenLabel = false,
	iconColor,
	iconName,
	iconPosition = "right",
	isDisabled = false,
	isSelected = false,
	label,
	labelVariant = "primary",
	onClick,
	type = "button",
	variant = "primary",
}: Properties) => (
	<button
		className={getValidClassNames(
			styles["btn"],
			variant === "icon" && styles[`position-${iconPosition}`],
			styles[`${variant}-button`],
			isSelected && styles[`${variant}-button-selected`],
		)}
		disabled={isDisabled}
		onClick={onClick}
		type={type}
	>
		<span
			className={getValidClassNames(
				hasVisuallyHiddenLabel && "visually-hidden",
				variant === "secondary" && styles["secondary-label"],
				styles[`${labelVariant}-label`],
			)}
		>
			{label}
		</span>
		{iconName && <Icon color={iconColor} name={iconName} />}
	</button>
);

export { Button };
