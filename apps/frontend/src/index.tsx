import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "~/assets/css/styles.css";
import {
	App,
	Notification,
	ProtectedRoute,
	RouterProvider,
	StoreProvider,
} from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { store } from "~/libs/modules/store/store.js";
import { Auth } from "~/pages/auth/auth.jsx";
import { NotFound } from "~/pages/not-found/not-found.jsx";
import { Onboarding } from "~/pages/onboarding/onboarding.jsx";
import { Profile } from "~/pages/profile/profile.jsx";
import { Quiz } from "~/pages/quiz/quiz.jsx";
import { Root } from "~/pages/root/root.jsx";
import { Settings } from "~/pages/settings/settings.jsx";

createRoot(document.querySelector("#root") as HTMLElement).render(
	<StrictMode>
		<StoreProvider store={store.instance}>
			<Notification />
			<RouterProvider
				routes={[
					{
						children: [
							{
								element: (
									<ProtectedRoute
										component={<Root />}
										redirectTo={AppRoute.SIGN_IN}
									/>
								),
								path: AppRoute.ROOT,
							},
							{
								element: (
									<ProtectedRoute
										component={<Profile />}
										redirectTo={AppRoute.SIGN_IN}
									/>
								),
								path: AppRoute.PROFILE,
							},
							{
								element: (
									<ProtectedRoute
										component={<Quiz />}
										redirectTo={AppRoute.SIGN_IN}
									/>
								),
								path: AppRoute.QUIZ,
							},
							{
								element: (
									<ProtectedRoute
										component={<Onboarding />}
										redirectTo={AppRoute.SIGN_IN}
									/>
								),
								path: AppRoute.ONBOARDING,
							},
							{
								element: (
									<ProtectedRoute
										component={<Settings />}
										redirectTo={AppRoute.SIGN_IN}
									/>
								),
								path: AppRoute.SETTINGS,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGN_IN,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGN_UP,
							},
							{
								element: <Auth />,
								path: AppRoute.FORGOT_PASSWORD,
							},
							{
								element: <Auth />,
								path: AppRoute.RESET_PASSWORD,
							},
						],
						element: <App />,
						path: AppRoute.ROOT,
					},
					{
						element: <NotFound />,
						path: AppRoute.ANY,
					},
				]}
			/>
		</StoreProvider>
	</StrictMode>,
);
