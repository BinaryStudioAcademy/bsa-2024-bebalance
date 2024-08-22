import { Link } from "~/libs/components/components.js";
import { type AppRoute } from "~/libs/enums/enums.js";
import { type SidebarIcon, type ValueOf } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	icon: SidebarIcon;
	pathname: string;
	title: string;
	to: ValueOf<typeof AppRoute>;
};

const SidebarLink: React.FC<Properties> = ({
	icon,
	pathname,
	title,
	to,
}: Properties) => {
	const isActive = pathname === to;
	return (
		<Link isActive={isActive} to={to} type="navLink">
			<img
				alt={title}
				className={styles["linkIcon"]}
				src={isActive ? icon.active : icon.inactive}
			/>
			{title}
		</Link>
	);
};

export { SidebarLink };
