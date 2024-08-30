import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button, Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useParams,
} from "~/libs/hooks/hooks.js";
import { actions as usersActions } from "~/modules/users/users.js";

import styles from "./styles.module.css";

const Profile: React.FC = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const { dataStatus, user } = useAppSelector(({ users }) => ({
		dataStatus: users.dataStatus,
		user: users.user,
	}));

	useEffect(() => {
		if (id) {
			void dispatch(usersActions.getById({ id: +id }));
		}
	}, [dispatch, id]);

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

						<div className={styles["user-info-container"]}>
							<div className={styles["user-info"]}>
								<div className={styles["label"]}>Name:</div>
								<div>{user.name}</div>
								<div className={styles["label"]}>Email: </div>
								<div>{user.email}</div>
							</div>
							<Button label="Edit profile" type="button" />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export { Profile };
