import styles from "./styles.module.css";

const Loader: React.FC = () => {
	return (
		<div className={styles["loaderContainer"]}>
			<div className={styles["loader"]} />
			<p className={styles["statusText"]}>
				Getting all your life areas in sync... <br /> Almost balanced!
			</p>
		</div>
	);
};

export { Loader };
