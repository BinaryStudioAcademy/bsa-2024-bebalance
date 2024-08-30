import {
	Loader,
	Notification,
	RouterOutlet,
} from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { storage, StorageKey } from "~/libs/modules/storage/storage.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { QuizForm } from "~/pages/quiz/libs/components/quiz-form/quiz-form.jsx";

const App: React.FC = () => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();

	const { dataStatus, user } = useAppSelector(({ auth }) => ({
		dataStatus: auth.dataStatus,
		user: auth.user,
	}));

	const isRoot = pathname === AppRoute.ROOT;

	useEffect(() => {
		const loadAuthenticatedUser = async (): Promise<void> => {
			const token = await storage.get(StorageKey.TOKEN);

			if (token && !user) {
				void dispatch(authActions.getAuthenticatedUser());
			}
		};

		void loadAuthenticatedUser();
	}, [dispatch, user]);

	const isLoading = dataStatus === DataStatus.PENDING;

	return (
		<>
			<div>
				<RouterOutlet />
			</div>
			{isLoading && <Loader />}
			{!isLoading && isRoot && (
				<>
					<QuizForm />
				</>
			)}
			<Notification />
		</>
	);
};

export { App };
