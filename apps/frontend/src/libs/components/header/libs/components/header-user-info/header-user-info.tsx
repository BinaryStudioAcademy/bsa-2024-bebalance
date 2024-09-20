import defaultAvatar from "~/assets/img/default-avatar.png";
import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { type UserDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	user: UserDto;
};

const HeaderUserInfo: React.FC<Properties> = ({ user }: Properties) => {
	return (
		<Link to={AppRoute.PROFILE}>
			<div className={styles["container"]}>
				<img
					alt={`${user.name}'s avatar`}
					className={styles["avatar"]}
					src={user.avatarUrl ?? defaultAvatar}
				/>
				<span className={styles["username"]}>{user.name}</span>
			</div>
		</Link>
	);
};

export { HeaderUserInfo };
