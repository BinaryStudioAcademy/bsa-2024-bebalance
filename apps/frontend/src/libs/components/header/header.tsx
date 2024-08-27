import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button } from "~/libs/components/components.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type UserDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	onSidebarToggle: () => void;
};

const Header: React.FC<Properties> = ({ onSidebarToggle }: Properties) => {
	const user: UserDto = useAppSelector(({ auth }) => auth.user as UserDto);

	return (
		<header className={styles["header"]}>
			<div className={styles["menu-btn"]}>
				<Button
					hasVisuallyHiddenLabel
					iconName="menu"
					label="Menu"
					onClick={onSidebarToggle}
				/>
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
