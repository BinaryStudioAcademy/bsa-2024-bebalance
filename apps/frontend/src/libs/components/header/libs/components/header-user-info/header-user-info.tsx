import defaultAvatar from "~/assets/img/default-avatar.png";
import { AppRoute } from "~/libs/enums/enums.js";
import { useCallback, useNavigate } from "~/libs/hooks/hooks.js";
import { type UserDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	user: UserDto;
};

const HeaderUserInfo: React.FC<Properties> = ({ user }: Properties) => {
	const navigate = useNavigate();

	const handleClick = useCallback(() => {
		navigate(AppRoute.PROFILE);
	}, [navigate]);

	return (
		<button className={styles["container"]} onClick={handleClick}>
			<img
				alt={`${user.name}'s avatar`}
				className={styles["avatar"]}
				src={user.avatarUrl ?? defaultAvatar}
			/>
			<span className={styles["username"]}>{user.name}</span>
		</button>
	);
};

export { HeaderUserInfo };
