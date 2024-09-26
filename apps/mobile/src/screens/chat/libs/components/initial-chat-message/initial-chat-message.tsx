import { ChatMessage, View, Wheel } from "~/libs/components/components";
import { useAppSelector } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";

import { styles } from "./styles";

const WHEEL_SIZE = 210;

const InitialChatMessage: React.FC = () => {
	const user = useAppSelector((state) => state.auth.user);

	const userName = user?.name ?? "";

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
					<Wheel size={WHEEL_SIZE} />
				</View>
			</ChatMessage>
		</>
	);
};

export { InitialChatMessage };
