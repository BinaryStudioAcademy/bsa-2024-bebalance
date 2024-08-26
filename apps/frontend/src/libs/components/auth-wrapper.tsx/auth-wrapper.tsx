import { QuizForm } from "~/pages/quiz/libs/components/quiz-form/quiz-form.jsx";

import { Header, Sidebar } from "../components.js";

const AuthWrapper: React.FC = () => {
	return (
		<>
			<Header />
			<Sidebar />
			<QuizForm />
		</>
	);
};

export { AuthWrapper };
