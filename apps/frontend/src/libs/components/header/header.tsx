import defaultAvatar from "~/assets/img/default-avatar.png";
import menu from "~/assets/img/menu.svg";
import { useAppSelector, useCallback } from "~/libs/hooks/hooks.js";
import { type UserDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	isSidebarOpen: boolean;
	setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<Properties> = ({
	isSidebarOpen,
	setIsSidebarOpen,
}: Properties) => {
	const user: UserDto = useAppSelector(({ auth }) => auth.user as UserDto);

	const toggleSidebar = useCallback((): void => {
		setIsSidebarOpen((previous) => !previous);
	}, [setIsSidebarOpen]);

	return (
		<header className={styles["header"]}>
			<div className={styles["menu-container"]}>
				<input
					checked={isSidebarOpen}
					hidden
					id="sidebar-toggler"
					onChange={toggleSidebar}
					type="checkbox"
				/>
				<label htmlFor="sidebar-toggler">
					<img alt="Menu" className={styles["menu"]} src={menu} />
				</label>
			</div>

			<div className={styles["user-info"]}>
				<img
					alt={`${user.name}'s avatar`}
					className={styles["user-avatar"]}
					src={defaultAvatar}
				/>
				<span className={styles["user-name"]}>{user.name}</span>
			</div>
		</header>
	);
};

export { Header };
