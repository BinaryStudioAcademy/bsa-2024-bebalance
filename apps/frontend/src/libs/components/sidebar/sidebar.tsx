import { useLocation } from "react-router-dom";

import { SidebarLink } from "./components/sidebar-link/sidebar-link.js";
import styles from "./styles.module.css";
import { sidebarItems } from "./utils/sidebar-items.js";

const Sidebar: React.FC = () => {
	const { pathname } = useLocation();
	return (
		<div className={styles["sidebarContainer"]}>
			<div className={styles["logoContainer"]}>Logo</div>
			<div className={styles["buttonsContainer"]}>
				{sidebarItems.map((item, index) => {
					return (
						<SidebarLink
							icon={item.icon}
							key={index}
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
