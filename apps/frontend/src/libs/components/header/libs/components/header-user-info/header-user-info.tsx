import defaultAvatar from "~/assets/img/default-avatar.png";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppNavigate, useCallback } from "~/libs/hooks/hooks.js";
import { type UserDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	user: UserDto;
};

const HeaderUserInfo: React.FC<Properties> = ({ user }: Properties) => {
	const navigate = useAppNavigate();

	const handleClick = useCallback(() => {
		navigate(AppRoute.PROFILE);
	}, [navigate]);

	return (
		<label className={styles["container"]}>
			<input className="visually-hidden" onClick={handleClick} type="button" />
			<img
				alt={`${user.name}'s avatar`}
				className={styles["avatar"]}
				src={user.avatarUrl ?? defaultAvatar}
			/>
			<span className={styles["username"]}>{user.name}</span>
		</label>
	);
};

export { HeaderUserInfo };
