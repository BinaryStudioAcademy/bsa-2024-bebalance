import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type IconName } from "~/libs/types/types.js";

import { Icon } from "../icon/icon.js";
import styles from "./styles.module.css";

type Properties = {
	hasVisuallyHiddenLabel?: boolean;
	iconName?: IconName;
	iconPosition?: "center" | "left" | "right";
	isFluid?: boolean;
	isPrimary?: boolean;
	label: string;
	onClick?: (() => void) | undefined;
	type?: "button" | "submit";
	variant?: "icon" | "secondary";
};

const Button: React.FC<Properties> = ({
	hasVisuallyHiddenLabel = false,
	iconName,
	iconPosition = "right",
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
			variant === "icon" && styles[`position-${iconPosition}`],
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
