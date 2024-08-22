import React from "react";

import { type UserDto } from "~/libs/types/types.js";

import { UserHeaderInfo } from "./components/components.js";
import styles from "./styles.module.css";

type Properties = {
	user: UserDto;
};

const Header: React.FC<Properties> = ({ user }) => {
	return (
		<header className={styles["header"]}>
			<UserHeaderInfo user={user} />
		</header>
	);
};

export { Header };
