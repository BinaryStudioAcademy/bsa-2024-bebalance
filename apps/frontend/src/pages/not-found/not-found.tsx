import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";

import styles from "./styles.module.css";

const NotFound: React.FC = () => (
	<div className={styles["pageContainer"]}>
		<h1 className={styles["title"]}>404 - Page Not Found</h1>
		<p className={styles["text"]}>
			The page you are looking for does not exist.
		</p>
		<Link to={AppRoute.ROOT}>Go to Homepage</Link>
	</div>
);

export { NotFound };
