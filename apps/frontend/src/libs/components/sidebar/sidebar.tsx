import { SIDEBAR_ITEMS } from "~/libs/constants/constants.js";
import { useLocation } from "~/libs/hooks/hooks.js";

import { SidebarLink } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Sidebar: React.FC = () => {
	const { pathname } = useLocation();
	return (
		<div className={styles["sidebarContainer"]}>
			<div className={styles["logoContainer"]}>Logo</div>
			<div className={styles["buttonsContainer"]}>
				{SIDEBAR_ITEMS.map((item) => {
					const { active, inactive } = item.icon;
					return (
						<SidebarLink
							iconName={item.href === pathname ? active : inactive}
							key={item.title}
							pathname={pathname}
							title={item.title}
							to={item.href}
						/>
					);
				})}
			</div>
		</div>
	);
};

export { Sidebar };
