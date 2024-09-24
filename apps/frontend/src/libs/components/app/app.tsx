import { RouterOutlet } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useNavigate,
} from "~/libs/hooks/hooks.js";
import { actions as appActions } from "~/modules/app/app.js";
import { actions as authActions } from "~/modules/auth/auth.js";

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const redirectLink = useAppSelector((state) => state.app.redirectLink);

	useEffect(() => {
		void dispatch(authActions.getAuthenticatedUser());
	}, [dispatch]);

	if (redirectLink) {
		navigate(redirectLink);
		dispatch(appActions.changeLink(null));
	}

	const handleBeforeUnload = useCallback((event: BeforeUnloadEvent): void => {
		event.preventDefault();
		event.returnValue = "Reload site?";
	}, []);

	useEffect(() => {
		window.addEventListener("beforeunload", handleBeforeUnload);

		return (): void => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [handleBeforeUnload]);

	return (
		<>
			<div>
				<RouterOutlet />
			</div>
		</>
	);
};

export { App };
