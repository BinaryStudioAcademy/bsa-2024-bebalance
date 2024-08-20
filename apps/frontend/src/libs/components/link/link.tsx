import { NavLink } from "react-router-dom";

import { type AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	to: ValueOf<typeof AppRoute>;
	underline?: boolean;
	variant?: "default" | "primary";
};

const Link: React.FC<Properties> = ({
	children,
	to,
	underline = false,
	variant = "default",
}: Properties) => (
	<NavLink
		className={getValidClassNames(
			styles["link"],
			underline && styles["underline"],
			variant === "primary" && styles["primary"],
		)}
		to={to}
	>
		{children}
	</NavLink>
);

export { Link };
