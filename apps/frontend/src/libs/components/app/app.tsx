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

	const { dataStatus } = useAppSelector(({ auth }) => ({
		dataStatus: auth.dataStatus,
	}));

	const isRoot = pathname === AppRoute.ROOT;

	useEffect(() => {
		void dispatch(authActions.getAuthenticatedUser());
	}, [dispatch]);

	const isLoading = dataStatus === DataStatus.PENDING;

	return (
		<>
			<div>
				<RouterOutlet />
			</div>
			{isLoading && <Loader />}
			{!isLoading && isRoot && (
				<>
					<Header />
					<Sidebar />
					<QuizForm />
				</>
			)}
			<Notification />
		</>
	);
};

export { App };
