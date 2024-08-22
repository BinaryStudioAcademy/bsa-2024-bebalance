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
			className={getValidClassNames(
				styles["link"],
				isActive && type && styles[`${type}-active`],
				type && styles[type],
			)}
			to={to}
		>
			{children}
		</NavLink>
	);
};

export { Link };
