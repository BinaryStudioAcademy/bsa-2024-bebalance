import { Button } from "~/libs/components/components.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type UserDto } from "~/modules/users/users.js";

import { HeaderUserInformation } from "./libs/components/components.js";
import styles from "./styles.module.css";

type Properties = {
	onSidebarToggle: () => void;
};

const Header: React.FC<Properties> = ({ onSidebarToggle }: Properties) => {
	const user: UserDto = useAppSelector(({ auth }) => auth.user as UserDto);

	return (
		<header className={styles["header"]}>
			<div className={styles["menu-btn"]}>
				<Button
					hasVisuallyHiddenLabel
					iconName="menu"
					iconPosition="center"
					label="Menu"
					onClick={onSidebarToggle}
					variant="icon"
				/>
			</div>

			<HeaderUserInformation user={user} />
		</header>
	);
};

export { Header };
