import { RouterOutlet } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
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

	return (
		<>
			<div>
				<RouterOutlet />
			</div>
		</>
	);
};

export { App };
