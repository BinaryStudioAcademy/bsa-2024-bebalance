import { NavLink } from "react-router-dom";

import { type AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type LinkType } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	isActive?: boolean;
	to: ValueOf<typeof AppRoute>;
	type?: LinkType;
};

const Link: React.FC<Properties> = ({
	children,
	isActive,
	to,
	type,
}: Properties) => {
	return (
		<NavLink
			className={getValidClassNames(styles["link"], type && styles[type])}
			to={to}
		>
			<span
				className={getValidClassNames(
					styles["content-container"],
					isActive && type && styles[`${type}-active`],
				)}
			>
				{children}
			</span>
		</NavLink>
	);
};

export { Link };
