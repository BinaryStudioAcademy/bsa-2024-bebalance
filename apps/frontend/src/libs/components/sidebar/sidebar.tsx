import { SIDEBAR_ITEMS } from "~/libs/constants/constants.js";
import { useLocation } from "~/libs/hooks/hooks.js";

import { SidebarLink } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Sidebar: React.FC = () => {
	const { pathname } = useLocation();

	return (
		<div className={styles["sidebar-container"]}>
			<div className={styles["logo-container"]}>Logo</div>
			<div className={styles["buttons-container"]}>
				{SIDEBAR_ITEMS.map(({ href, icon, label }) => {
					const { active, inactive } = icon;

					return (
						<SidebarLink
							iconName={href === pathname ? active : inactive}
							key={label}
							label={label}
							pathname={pathname}
							to={href}
						/>
					);
				})}
			</div>
		</div>
	);
};

export { Sidebar };
