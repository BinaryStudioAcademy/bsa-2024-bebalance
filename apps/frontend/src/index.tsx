import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import "~/assets/css/styles.css";
import {
	App,
	Loader,
	RouterProvider,
	StoreProvider,
} from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { store } from "~/libs/modules/store/store.js";
import { Auth } from "~/pages/auth/auth.jsx";

createRoot(document.querySelector("#root") as HTMLElement).render(
	<StrictMode>
		<StoreProvider store={store.instance}>
			<Suspense fallback={<Loader />}>
				<RouterProvider
					routes={[
						{
							children: [
								{
									element: "Root",
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
							],
							element: <App />,
							path: AppRoute.ROOT,
						},
					]}
				/>
			</Suspense>
		</StoreProvider>
	</StrictMode>,
);
