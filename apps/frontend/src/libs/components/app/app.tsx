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

	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<div>
				<RouterOutlet />
			</div>

			{isRoot && (
				<div style={{ display: "none" }}>
					<QuizForm />
				</div>
			)}
			<Notification />
		</>
	);
};

export { App };
