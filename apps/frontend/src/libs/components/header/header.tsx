import defaultAvatar from "~/assets/img/default-avatar.png";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { UserDto } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const Header: React.FC = () => {
	const user: UserDto = useAppSelector(({ auth }) => auth.user as UserDto);

	return (
		<>
			<header className={styles["header"]}>
				<div className={styles["user-info"]}>
					<img
						alt={`${user.name}'s avatar`}
						className={styles["user-avatar"]}
						src={defaultAvatar}
					/>
					<span className={styles["user-name"]}>{user.name}</span>
				</div>
			</header>
		</>
	);
};

export { Header };
