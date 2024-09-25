import styles from "./styles.module.css";

const MessageLoader: React.FC = () => {
	return (
		<span className={styles["loader-text"]}>
			Assistant typing
			<span className={styles["dot"]}>.</span>
			<span className={styles["dot"]}>.</span>
			<span className={styles["dot"]}>.</span>
		</span>
	);
};

export { MessageLoader };
