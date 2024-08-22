import {
	Loader,
	Notification,
	QuizQuestion,
	RouterOutlet,
} from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

type FormValues = {
	value: string;
};

const App: React.FC = () => {
	const { pathname } = useLocation();
	const { control } = useAppForm<FormValues>({
		defaultValues: { value: "" },
	});
	const dispatch = useAppDispatch();
	const { dataStatus, user, users } = useAppSelector(({ users }) => ({
		dataStatus: users.dataStatus,
		user: users.user,
		users: users.users,
	}));

	const isRoot = pathname === AppRoute.ROOT;

	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
			void dispatch(userActions.getAuthenticatedUser());
		}
	}, [isRoot, dispatch]);

	const isLoading = dataStatus === DataStatus.PENDING;

	return (
		<>
			<div>
				<RouterOutlet />
			</div>
			{isLoading && <Loader />}
			{!isLoading && isRoot && (
				<>
					<h2>Users: {user?.email}</h2>
					<h3>Status: {dataStatus}</h3>
					<ul>
						{users.map((user) => (
							<li key={user.id}>{user.email}</li>
						))}
					</ul>
					<QuizQuestion control={control} />
				</>
			)}
			<Notification />
		</>
	);
};

export { App };
