import { QuizIntroductionScreen } from "./components/components.js";

const Quiz: React.FC = () => {
	const getScreen = (): React.ReactNode => {
		return <QuizIntroductionScreen />;
	};

	return <>{getScreen()}</>;
};

export { Quiz };
