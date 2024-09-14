import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type IconName } from "~/libs/types/types.js";

import { Icon } from "../icon/icon.js";
import styles from "./styles.module.css";

type Properties = {
	hasVisuallyHiddenLabel?: boolean;
	iconName?: IconName;
	iconPosition?: "center" | "left" | "right";
	isDisabled?: boolean;
	isSelected?: boolean;
	label: string;
	onClick?: (() => void) | undefined;
	type?: "button" | "submit";
	variant?: "icon" | "primary" | "secondary" | "switch";
};

const Button: React.FC<Properties> = ({
	hasVisuallyHiddenLabel = false,
	iconName,
	iconPosition = "right",
	isDisabled = false,
	isSelected = false,
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
			isSelected && styles[`${variant}-button-selected`],
		)}
		disabled={isDisabled}
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
