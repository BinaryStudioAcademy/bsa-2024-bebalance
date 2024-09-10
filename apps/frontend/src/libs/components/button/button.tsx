import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type IconName } from "~/libs/types/types.js";

import { Icon } from "../icon/icon.js";
import styles from "./styles.module.css";

type Properties = {
	form?: string;
	hasVisuallyHiddenLabel?: boolean;
	iconName?: IconName;
	iconPosition?: "center" | "left" | "right";
	isDisabled?: boolean;
	isPrimary?: boolean;
	label: string;
	onClick?: (() => void) | undefined;
	type?: "button" | "submit";
	variant?: "icon" | "secondary";
};

const Button: React.FC<Properties> = ({
	form,
	hasVisuallyHiddenLabel = false,
	iconName,
	iconPosition = "right",
	isDisabled = false,
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
			isPrimary && styles["primary"],
			!isPrimary && styles["secondary"],
			variant && styles[`${variant}-button`],
			isDisabled && styles["disabled-button"],
		)}
		disabled={isDisabled}
		form={form}
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
