import defaultAvatar from "~/assets/img/default-avatar.png";
import runImg from "~/assets/img/run.svg";
import { Button, Loader, Popup } from "~/libs/components/components.js";
import { DataStatus, PopupMessage } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type UserDto,
	actions as usersActions,
	type UserUpdatePasswordRequestDto,
	type UserUpdateRequestDto,
} from "~/modules/users/users.js";

import {
	UpdatePasswordForm,
	UpdateUserForm,
} from "./libs/components/components.js";
import styles from "./styles.module.css";

const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const authenticatedUser = useAppSelector(({ auth }) => auth.user);
	const { dataStatus, user } = useAppSelector(({ users }) => ({
		dataStatus: users.dataStatus,
		user: users.user,
	}));

	useEffect(() => {
		void dispatch(
			usersActions.getById({ id: (authenticatedUser as UserDto).id }),
		);
	}, [dispatch, authenticatedUser]);

	const handleUpdateSubmit = useCallback(
		(payload: UserUpdateRequestDto): void => {
			void dispatch(
				usersActions.update({ data: payload, id: (user as UserDto).id }),
			);
		},
		[dispatch, user],
	);

	const handleUpdatePasswordSubmit = useCallback(
		(
			payload: Omit<UserUpdatePasswordRequestDto, "email" | "jwtToken">,
		): void => {
			void dispatch(
				authActions.updatePassword({
					email: user?.email as string,
					jwtToken: "",
					...payload,
				}),
			);
		},
		[dispatch, user],
	);

	const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState<boolean>(false);

	const handleSignOut = useCallback(() => {
		setIsLogoutPopupOpen((previousState) => !previousState);
	}, [setIsLogoutPopupOpen]);

	const handleConfirmLogout = useCallback(() => {
		void dispatch(authActions.logOut());
	}, [dispatch]);

	const isLoading = dataStatus === DataStatus.PENDING;

	return (
		<>
			<Popup
				closeButtonLabel="No"
				confirmButtonLabel="Yes"
				icon={runImg}
				isOpen={isLogoutPopupOpen}
				onClose={handleSignOut}
				onConfirm={handleConfirmLogout}
				title={PopupMessage.LOGOUT_CONFIRM}
			/>
			{isLoading && <Loader />}
			{user && (
				<div className={styles["page-container"]}>
					<h4 className={styles["title"]}>Profile</h4>
					<div className={styles["content-container"]}>
						<img
							alt={`${user.name}'s avatar`}
							className={styles["user-avatar"]}
							src={defaultAvatar}
						/>
						<UpdateUserForm onSubmit={handleUpdateSubmit} user={user} />
					</div>
					<h4 className={styles["title-password"]}>Change your password</h4>
					<div className={styles["password-container"]}>
						<UpdatePasswordForm onSubmit={handleUpdatePasswordSubmit} />
						<div className={styles["button-container"]}>
							<Button label="SIGN OUT" onClick={handleSignOut} type="button" />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export { Profile };
