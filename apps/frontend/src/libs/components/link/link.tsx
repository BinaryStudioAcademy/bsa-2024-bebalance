import { NavLink } from "react-router-dom";

import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import styles from "../css/link.module.css";

type Properties = {
	children: React.ReactNode;
	to: ValueOf<typeof AppRoute>;
	variant: "default";
};

const Link: React.FC<Properties> = ({
	children,
	to,
	variant = "default",
}: Properties) => {
	const linkClass = "link-" + variant;
	return (
		<NavLink
			className={`${styles["link"] as string} ${styles[linkClass] as string}`}
			to={to}
		>
			{children}
		</NavLink>
	);
};
export { Link };
