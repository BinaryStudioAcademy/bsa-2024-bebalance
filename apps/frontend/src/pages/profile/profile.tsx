import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button, Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useParams,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	actions as usersActions,
	type UserUpdateRequestDto,
} from "~/modules/users/users.js";

import { UpdateUserForm } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Profile: React.FC = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const { dataStatus, user } = useAppSelector(({ users }) => ({
		dataStatus: users.dataStatus,
		user: users.user,
	}));
	const [isUpdating, setIsUpdating] = useState<boolean>(false);

	useEffect(() => {
		if (id) {
			void dispatch(usersActions.getById({ id: +id }));
		}
	}, [dispatch, id]);

	useEffect(() => {
		if (dataStatus === DataStatus.FULFILLED) {
			setIsUpdating(false);
		}
	}, [dataStatus]);

	const toggleIsUpdate = useCallback((): void => {
		setIsUpdating(!isUpdating);
	}, [setIsUpdating, isUpdating]);

	const handleUpdateSubmit = useCallback(
		(payload: UserUpdateRequestDto): void => {
			if (id) {
				void dispatch(usersActions.update({ data: payload, id: +id }));
			}
		},
		[dispatch, id],
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
						{isUpdating ? (
							<UpdateUserForm
								onCancel={toggleIsUpdate}
								onSubmit={handleUpdateSubmit}
								user={user}
							/>
						) : (
							<div className={styles["user-info-container"]}>
								<div className={styles["user-info"]}>
									<div className={styles["label"]}>Name:</div>
									<div>{user.name}</div>
									<div className={styles["label"]}>Email: </div>
									<div>{user.email}</div>
								</div>
								<Button
									label="Edit profile"
									onClick={toggleIsUpdate}
									type="button"
								/>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export { Profile };
