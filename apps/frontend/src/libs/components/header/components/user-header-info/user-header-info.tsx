import React from "react";

import defaultAvatar from "~/assets/img/default-avatar.png";
import { type UserDto } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	user: UserDto;
};

const UserHeaderInfo: React.FC<Properties> = ({ user }) => {
	return (
		<div className={styles["user-info"]}>
			<img
				alt={`${user.name}'s avatar`}
				className={styles["user-avatar"]}
				src={defaultAvatar}
			/>
			<span className={styles["user-name"]}>{user.name}</span>
		</div>
	);
};

export { UserHeaderInfo };
