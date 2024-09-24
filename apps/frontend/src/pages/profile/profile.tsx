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
	UpdateAvatarForm,
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
		(payload: UserUpdatePasswordRequestDto): void => {
			void dispatch(authActions.updatePassword(payload));
		},
		[dispatch],
	);

	const handleUploadAvatarSubmit = useCallback(
		(payload: FormData): void => {
			void dispatch(usersActions.uploadAvatar(payload));
		},
		[dispatch],
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
					<div className={styles["header-container"]}>
						<h4 className={styles["title"]}>Profile</h4>
						<div className={styles["button-container"]}>
							<Button
								iconName="signOut"
								label="LOG OUT"
								onClick={handleSignOut}
								type="button"
								variant="secondary"
							/>
						</div>
					</div>

					<div className={styles["content-container"]}>
						<UpdateAvatarForm onSubmit={handleUploadAvatarSubmit} user={user} />
						<UpdateUserForm onSubmit={handleUpdateSubmit} user={user} />
					</div>

					<h4 className={styles["title-password"]}>Change your password</h4>
					<div className={styles["password-container"]}>
						<UpdatePasswordForm onSubmit={handleUpdatePasswordSubmit} />
					</div>
				</div>
			)}
		</>
	);
};

export { Profile };
