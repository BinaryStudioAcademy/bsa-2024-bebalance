import { useCallback, useState } from "~/libs/hooks/hooks.js";

import { Header, Sidebar } from "../components.js";
import style from "./style.module.css";

type Properties = {
	children: React.ReactNode;
};

const AuthWrapper: React.FC<Properties> = ({ children }: Properties) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

	const handleSidebarToggle = useCallback((): void => {
		setIsSidebarOpen((previousState) => !previousState);
	}, [setIsSidebarOpen]);

	return (
		<main className={style["auth-wrapper-container"]}>
			<Sidebar
				isSidebarOpen={isSidebarOpen}
				onSidebarToggle={handleSidebarToggle}
			/>

			<section className={style["right-side-section"]}>
				<Header onSidebarToggle={handleSidebarToggle} />
				{children}
			</section>
		</main>
	);
};

export { AuthWrapper };
