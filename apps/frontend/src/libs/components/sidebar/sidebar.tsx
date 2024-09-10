import runImg from "~/assets/img/run.svg";
import { Button, Popup } from "~/libs/components/components.js";
import { SIDEBAR_ITEMS } from "~/libs/constants/constants.js";
import { PopupMessage } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useCallback,
	useLocation,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";

import { SidebarLink } from "./libs/components/components.js";
import styles from "./styles.module.css";

type Properties = {
	isSidebarOpen: boolean;
	onSidebarToggle: () => void;
};

const Sidebar: React.FC<Properties> = ({
	isSidebarOpen,
	onSidebarToggle,
}: Properties) => {
	const { pathname } = useLocation();

	const dispatch = useAppDispatch();

	const [isLogout, setIsLogout] = useState<boolean>(false);

	const handleSignOut = useCallback(() => {
		setIsLogout((previousState) => !previousState);
	}, [setIsLogout]);

	const handleConfirmLogout = useCallback(() => {
		void dispatch(authActions.logOut());
	}, [dispatch]);

	return (
		<div
			className={getValidClassNames(
				styles["sidebar-container"],
				isSidebarOpen && styles["open"],
			)}
		>
			<div className={styles["close-btn"]}>
				<Button
					hasVisuallyHiddenLabel
					iconName="close"
					iconPosition="center"
					label="Close"
					onClick={onSidebarToggle}
					variant="icon"
				/>
			</div>

			<div className={styles["logo-container"]}>Logo</div>
			<div className={styles["buttons-container"]}>
				<div className={styles["navlinks-container"]}>
					{SIDEBAR_ITEMS.map(({ href, icon, label }) => {
						const { active, inactive } = icon;

						return (
							<SidebarLink
								iconName={href === pathname ? active : inactive}
								key={label}
								label={label}
								pathname={pathname}
								to={href}
							/>
						);
					})}
				</div>
				<Button label="Sign out" onClick={handleSignOut} />
			</div>

			{isLogout && (
				<Popup
					closeText="No"
					confirmText="Yes"
					icon={runImg}
					onClose={handleSignOut}
					onConfirm={handleConfirmLogout}
					title={PopupMessage.LOGOUT_CONFIRM}
				/>
			)}
		</div>
	);
};

export { Sidebar };
