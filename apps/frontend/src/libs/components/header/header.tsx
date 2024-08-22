import React from "react";

import { useAppSelector } from "~/libs/hooks/use-app-selector/use-app-selector.hook.js";

import { UserHeaderInfo } from "./components/components.js";
import styles from "./styles.module.css";

const Header: React.FC = () => {
	const user = useAppSelector(({ users }) => users.user);

	return (
		<header className={styles["header"]}>
			{user && <UserHeaderInfo user={user} />}
		</header>
	);
};

export { Header };
