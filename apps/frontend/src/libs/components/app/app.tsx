import {
	Header,
	Loader,
	Notification,
	RouterOutlet,
	Sidebar,
} from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { QuizForm } from "~/pages/quiz/libs/components/quiz-form/quiz-form.jsx";

const App: React.FC = () => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
<<<<<<< HEAD
	const { dataStatus, user, users } = useAppSelector(({ users }) => ({
		dataStatus: users.dataStatus,
		user: users.user,
		users: users.users,
=======

	const { dataStatus } = useAppSelector(({ auth }) => ({
		dataStatus: auth.dataStatus,
>>>>>>> 4b0baab25f450cd24a668af627e7a64ff7e8d947
	}));

	const isRoot = pathname === AppRoute.ROOT;

	useEffect(() => {
		if (isRoot) {
<<<<<<< HEAD
			void dispatch(userActions.loadAll());
			void dispatch(userActions.getAuthenticatedUser());
=======
			void dispatch(authActions.getAuthenticatedUser());
>>>>>>> 4b0baab25f450cd24a668af627e7a64ff7e8d947
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
<<<<<<< HEAD
					<h2>Users: {user?.email}</h2>
					<h3>Status: {dataStatus}</h3>
					<ul>
						{users.map((user) => (
							<li key={user.id}>{user.email}</li>
						))}
					</ul>
=======
					<Header />
					<Sidebar />
					<QuizForm />
>>>>>>> 4b0baab25f450cd24a668af627e7a64ff7e8d947
				</>
			)}
			<Notification />
		</>
	);
};

export { App };
