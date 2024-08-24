import defaultAvatar from "~/assets/img/default-avatar.png";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { UserDto } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const Header: React.FC = () => {
	const user: undefined | UserDto = useAppSelector(
		({ auth }) => auth.user?.user,
	);

	return (
		<>
			<header className={styles["header"]}>
				<div className={styles["user-info"]}>
					<img
						alt={`${user?.name ?? "anonymous"}'s avatar`}
						className={styles["user-avatar"]}
						src={defaultAvatar}
					/>
					<span className={styles["user-name"]}>
						{user?.name ?? "Anonymous"}
					</span>
				</div>
			</header>
		</>
	);
};

export { Header };
