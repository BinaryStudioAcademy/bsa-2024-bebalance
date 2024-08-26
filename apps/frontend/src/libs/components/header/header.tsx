import defaultAvatar from "~/assets/img/default-avatar.png";
import { Icon } from "~/libs/components/components.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type UserDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	toggleSidebar: () => void;
};

const Header: React.FC<Properties> = ({ toggleSidebar }: Properties) => {
	const user: UserDto = useAppSelector(({ auth }) => auth.user as UserDto);

	return (
		<header className={styles["header"]}>
			<button className={styles["menu-btn"]} onClick={toggleSidebar}>
				<Icon name="menu" />
			</button>

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
