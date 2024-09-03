import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "~/assets/css/styles.css";
import {
	App,
	ProtectedRoute,
	RouterProvider,
	StoreProvider,
} from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { store } from "~/libs/modules/store/store.js";
import { Auth } from "~/pages/auth/auth.jsx";
import { Chat } from "~/pages/chat/chat.jsx";
import { NotFound } from "~/pages/not-found/not-found.jsx";
import { Quiz } from "~/pages/quiz/quiz.jsx";

createRoot(document.querySelector("#root") as HTMLElement).render(
	<StrictMode>
		<StoreProvider store={store.instance}>
			<RouterProvider
				routes={[
					{
						children: [
							{
								element: (
									<ProtectedRoute
										component="Root"
										redirectTo={AppRoute.SIGN_IN}
									/>
								),
								path: AppRoute.ROOT,
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
										component={<Chat />}
										redirectTo={AppRoute.SIGN_IN}
									/>
								),
								path: AppRoute.CHAT,
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
