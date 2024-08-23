import React from "react";

import { useAppSelector } from "~/libs/hooks/hooks.js";

import { UserHeaderInformation } from "./components/components.js";
import styles from "./styles.module.css";

const Header: React.FC = () => {
	const user = useAppSelector(({ users }) => users.user);

	return (
		<header className={styles["header"]}>
			{user && <UserHeaderInformation user={user} />}
		</header>
	);
};

export { Header };
