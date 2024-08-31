import defaultAvatar from "~/assets/img/default-avatar.png";
import { Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
import {
	type UserDto,
	actions as usersActions,
	type UserUpdateRequestDto,
} from "~/modules/users/users.js";

import { UpdateUserForm } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const { dataStatus, user } = useAppSelector(({ users }) => ({
		dataStatus: users.dataStatus,
		user: users.user,
	}));

	useEffect(() => {
		void dispatch(usersActions.getUserFromAuth());
	}, [dispatch]);

	const handleUpdateSubmit = useCallback(
		(payload: UserUpdateRequestDto): void => {
			void dispatch(
				usersActions.update({ data: payload, id: (user as UserDto).id }),
			);
		},
		[dispatch, user],
	);

	const isLoading = dataStatus === DataStatus.PENDING;

	return (
		<>
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
				</div>
			)}
		</>
	);
};

export { Profile };
