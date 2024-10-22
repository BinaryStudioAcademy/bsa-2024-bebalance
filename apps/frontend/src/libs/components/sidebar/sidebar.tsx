import ColorfullLogo from "~/assets/img/colorfull-logo.svg?react";
import { Button } from "~/libs/components/components.js";
import { SIDEBAR_ITEMS } from "~/libs/constants/constants.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useLocation } from "~/libs/hooks/hooks.js";

import { SidebarLink } from "./libs/components/components.js";
import styles from "./styles.module.css";

type Properties = {
	isSidebarOpen: boolean;
	onSidebarToggle: () => void;
};

const Sidebar: React.FC<Properties> = ({
	isSidebarOpen,
	onSidebarToggle,
}: Properties) => {
	const { pathname } = useLocation();

	return (
		<div
			className={getValidClassNames(
				styles["sidebar-container"],
				isSidebarOpen && styles["open"],
			)}
		>
			<div className={styles["close-btn"]}>
				<Button
					hasVisuallyHiddenLabel
					iconName="close"
					iconPosition="center"
					label="Close"
					onClick={onSidebarToggle}
					variant="icon"
				/>
			</div>

			<div className={styles["logo-container"]}>
				<ColorfullLogo />
			</div>
			<div className={styles["buttons-container"]}>
				<div className={styles["navlinks-container"]}>
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
		</div>
	);
};

export { Sidebar };
