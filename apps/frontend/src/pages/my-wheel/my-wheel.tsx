import { Sidebar } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const MyWheel: React.FC = () => {
	return (
		<div className={styles["pageContainer"]}>
			<Sidebar />
			<div></div>
		</div>
	);
};

export { MyWheel };
