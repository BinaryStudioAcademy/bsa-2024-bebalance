// import { QuizForm } from "~/pages/quiz/libs/components/quiz-form/quiz-form.jsx";

import { Header, Sidebar } from "../components.js";
import style from "./style.module.css";

type Properties = {
	children: React.ReactNode;
};

const AuthWrapper: React.FC<Properties> = ({ children }: Properties) => {
	return (
		<main className={style["auth-wrapper-container"]}>
			<section className={style["left-side-section"]}>
				<Sidebar />
			</section>
			<section className={style["right-side-section"]}>
				<Header />
				{children}
			</section>
		</main>
	);
};

export { AuthWrapper };
