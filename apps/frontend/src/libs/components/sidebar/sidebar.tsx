import { useLocation } from "react-router-dom";

import { AppRoute, sidebarLinkIcon } from "~/libs/enums/enums.js";

import { SidebarLink } from "./components/sidebar-link/sidebar-link.js";
import styles from "./styles.module.css";

const Sidebar: React.FC = () => {
	const { pathname } = useLocation();
	return (
		<div className={styles["sidebarContainer"]}>
			<div className={styles["logoContainer"]}>Logo</div>
			<div className={styles["buttonsContainer"]}>
				<SidebarLink
					icon={sidebarLinkIcon.MY_WHEEL}
					pathname={pathname}
					title="My Wheel"
					to={AppRoute.ROOT}
				/>
			</div>
		</div>
	);
};

export { Sidebar };
