import { ChatMessage, View, Wheel } from "~/libs/components/components";
import { transformScoresToWheelData } from "~/libs/helpers/helpers";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useFocusEffect,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { actions as quizActions } from "~/slices/quiz/quiz";

import { styles } from "./styles";

const WHEEL_SIZE = 210;

const InitialChatMessage: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth.user);
	const score = useAppSelector((state) => state.quiz.scores);

	const userName = user?.name ?? "";

	useFocusEffect(
		useCallback(() => {
			void dispatch(quizActions.getScores());
		}, [dispatch]),
	);

	return (
		<>
			<ChatMessage
				style={globalStyles.mb8}
				text={`Hello ${userName}! I'm so glad you're here and taking steps towards a more balanced life. You've got this!`}
			/>
			<ChatMessage text="Here are your Wheel results:">
				<View
					style={[
						globalStyles.alignItemsCenter,
						globalStyles.pv16,
						globalStyles.mt8,
						styles.wheelContainer,
					]}
				>
					<Wheel
						categoriesData={transformScoresToWheelData(score)}
						size={WHEEL_SIZE}
					/>
				</View>
			</ChatMessage>
		</>
	);
};

export { InitialChatMessage };
