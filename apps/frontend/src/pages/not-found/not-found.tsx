import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";

import styles from "./styles.module.css";

const NotFound: React.FC = () => (
	<div className={styles["pageContainer"]}>
		<div className={styles["white-dots"]} />
		<h1 className={styles["title"]}>Looks like we rolled off course.</h1>
		<p className={styles["text"]}>
			Spin back to the homepage and regain your balance!
		</p>
		<Link to={AppRoute.ROOT} type="button">
			Go to Homepage
		</Link>
	</div>
);

export { NotFound };
