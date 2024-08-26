import {
	Header,
	Loader,
	Notification,
	RouterOutlet,
	Sidebar,
} from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useLocation,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { QuizForm } from "~/pages/quiz/libs/components/quiz-form/quiz-form.jsx";

import styles from "./styles.module.css";

const App: React.FC = () => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

	const { dataStatus } = useAppSelector(({ auth }) => ({
		dataStatus: auth.dataStatus,
	}));

	const isRoot = pathname === AppRoute.ROOT;

	useEffect(() => {
		if (isRoot) {
			void dispatch(authActions.getAuthenticatedUser());
		}
	}, [isRoot, dispatch]);

	const isLoading = dataStatus === DataStatus.PENDING;

	const handleSidebarToggle = useCallback((): void => {
		setIsSidebarOpen((previous) => !previous);
	}, [setIsSidebarOpen]);

	return (
		<>
			{isLoading && <Loader />}

			{!isLoading && isRoot ? (
				<div
					className={getValidClassNames(
						styles["app-container"],
						isSidebarOpen && styles["open"],
					)}
				>
					<Sidebar
						isSidebarOpen={isSidebarOpen}
						onSidebarToggle={handleSidebarToggle}
					/>
					<div className={styles["main"]}>
						<Header onSidebarToggle={handleSidebarToggle} />
						<QuizForm />
						<RouterOutlet />
					</div>
				</div>
			) : (
				<RouterOutlet />
			)}

			<Notification />
		</>
	);
};

export { App };
