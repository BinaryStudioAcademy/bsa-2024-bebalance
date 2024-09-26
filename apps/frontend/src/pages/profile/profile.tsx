import runImg from "~/assets/img/run.svg";
import { Button, Loader, Popup } from "~/libs/components/components.js";
import { BLOCKED_BLOCKER_STATE } from "~/libs/constants/constants.js";
import { DataStatus, PopupMessage } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
	useUnsavedChangesBlocker,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type UserDto,
	actions as usersActions,
	type UserUpdatePasswordRequestDto,
	type UserUpdateRequestDto,
} from "~/modules/users/users.js";

import {
	ProfileSection,
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

	const [isDirty, setIsDirty] = useState<boolean>(false);

	const { blockerState, handlePopupCancel, handlePopupConfirm } =
		useUnsavedChangesBlocker({ hasUncavedChanges: isDirty });

	return (
		<>
			<Popup
				closeButtonLabel="No"
				confirmButtonLabel="Yes"
				hasCloseIcon
				icon={runImg}
				isOpen={isLogoutPopupOpen}
				onClose={handleSignOut}
				onConfirm={handleConfirmLogout}
				title={PopupMessage.LOGOUT_CONFIRM}
			/>
			<Popup
				closeButtonLabel="CANCEL"
				confirmButtonLabel="YES"
				hasCloseIcon
				icon={runImg}
				isOpen={isDirty && blockerState === BLOCKED_BLOCKER_STATE}
				onClose={handlePopupCancel}
				onConfirm={handlePopupConfirm}
				title="Unsaved changes will be lost. Continue?"
			/>
			{isLoading && <Loader />}
			{user && (
				<div className={styles["page-container"]}>
					<div className={styles["header-container"]}>
						<h4 className={styles["header-title"]}>Profile</h4>
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

					<ProfileSection hasVisuallyHiddenTitle title="Profile">
						<UpdateAvatarForm onSubmit={handleUploadAvatarSubmit} user={user} />
						<UpdateUserForm
							onSubmit={handleUpdateSubmit}
							setIsDirty={setIsDirty}
							user={user}
						/>
					</ProfileSection>

					<ProfileSection title="Change Password">
						<UpdatePasswordForm
							onSubmit={handleUpdatePasswordSubmit}
							setIsDirty={setIsDirty}
						/>
					</ProfileSection>
				</div>
			)}
		</>
	);
};

export { Profile };
