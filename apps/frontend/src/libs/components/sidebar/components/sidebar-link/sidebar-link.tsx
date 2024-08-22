import { Link } from "~/libs/components/components.js";
import { type AppRoute, type sidebarLinkIcon } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	icon: ValueOf<typeof sidebarLinkIcon>;
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
				alt={icon.ALT}
				className={styles["linkPicture"]}
				src={isActive ? icon.ACTIVE : icon.INACTIVE}
			/>
			{title}
		</Link>
	);
};

export { SidebarLink };
