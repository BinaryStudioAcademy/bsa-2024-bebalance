import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	title: string;
};

const ProfileSection: React.FC<Properties> = ({
	children,
	title,
}: Properties) => {
	return (
		<section>
			<h4 className={styles["title"]}>{title}</h4>
			<div className={styles["content-container"]}>{children}</div>
		</section>
	);
};

export { ProfileSection };
