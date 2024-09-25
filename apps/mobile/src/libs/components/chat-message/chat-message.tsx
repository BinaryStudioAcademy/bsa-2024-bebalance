import AIAvatar from "~/assets/svg/ai-avatar.svg";
import { Icon, Text, View } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";
import { type StyleProp, type ViewStyle } from "~/libs/types/types";
import { type TextMessage } from "~/packages/chat/chat";

import { styles } from "./styles";

type Properties = {
	children?: React.ReactNode;
	content?: TextMessage;
	isUser?: boolean;
	style?: StyleProp<ViewStyle>;
	text?: string;
};

const ICON_SIZE = 34;

const ChatMessage: React.FC<Properties> = ({
	children,
	content,
	isUser = false,
	style,
	text = "",
}: Properties) => {
	const messageText = content?.text ?? text;

	const Avatar = isUser ? (
		<Icon color={BaseColor.LIGHT_GRAY} name="account-circle" size={ICON_SIZE} />
	) : (
		<AIAvatar />
	);

	return (
		<View
			style={[
				globalStyles.flexDirectionRow,
				globalStyles.gap8,
				isUser && styles.userWrapper,
			]}
		>
			{Avatar}
			<View
				style={[
					globalStyles.p12,
					isUser
						? styles.userContainer
						: [globalStyles.flex1, styles.container],
					style,
				]}
			>
				{Boolean(messageText) && (
					<Text style={!isUser && globalStyles.mb4}>{messageText}</Text>
				)}
				{children}
			</View>
		</View>
	);
};

export { ChatMessage };
