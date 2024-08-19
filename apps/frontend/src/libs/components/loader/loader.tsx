import React from "react";

import styles from "./styles.module.css";

const Loader: React.FC = () => {
	return (
		<div className={styles["loaderContainer"]}>
			<div className={styles["loader"]} />
			<p className={styles["statusText"]}>Loading...</p>
		</div>
	);
};

export { Loader };
