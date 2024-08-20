import { NavLink } from "react-router-dom";

import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type Properties = {
	children: React.ReactNode;
	className?: string;
	to: ValueOf<typeof AppRoute>;
};

const Link: React.FC<Properties> = ({
	children,
	className,
	to,
}: Properties) => (
	<NavLink className={className || ""} to={to}>
		{children}
	</NavLink>
);

export { Link };
