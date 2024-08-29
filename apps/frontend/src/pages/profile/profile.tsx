import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button } from "~/libs/components/components.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type UserDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

const Profile: React.FC = () => {
	const user: UserDto = useAppSelector(({ auth }) => auth.user as UserDto);

	return (
		<div className={styles["page-container"]}>
			<h4 className={styles["title"]}>Profile</h4>
			<div className={styles["content-container"]}>
				<img
					alt={`${user.name}'s avatar`}
					className={styles["user-avatar"]}
					src={defaultAvatar}
				/>

				<div className={styles["user-info-container"]}>
					<div className={styles["user-info"]}>
						<div className={styles["label"]}>Name:</div>
						<div>{user.name}</div>
						<div className={styles["label"]}>Email: </div>
						<div>{user.email}</div>
					</div>
					<Button label="Edit profile" type="button" />
				</div>
			</div>
		</div>
	);
};

export { Profile };
