import AIAvatar from "~/assets/svg/ai-avatar.svg";
import { Text, UserAvatar, View } from "~/libs/components/components";
import { useAppDispatch, useAppSelector, useEffect } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type StyleProp, type ViewStyle } from "~/libs/types/types";
import { type TextMessage } from "~/packages/chat/chat";
import { type UserDto } from "~/packages/users/users";
import { actions as usersActions } from "~/slices/users/users";

import { styles } from "./styles";

type Properties = {
	children?: React.ReactNode;
	content?: TextMessage;
	isUser?: boolean;
	style?: StyleProp<ViewStyle>;
	text?: string;
};

const ChatMessage: React.FC<Properties> = ({
	children,
	content,
	isUser = false,
	style,
	text = "",
}: Properties) => {
	const messageText = content?.text ?? text;
	const dispatch = useAppDispatch();
	const authenticatedUser = useAppSelector(({ auth }) => auth.user);
	const user = useAppSelector((state) => state.users.user);

	useEffect(() => {
		void dispatch(
			usersActions.getById({ id: (authenticatedUser as UserDto).id }),
		);
	}, [dispatch, authenticatedUser]);

	return (
		<View
			style={[
				globalStyles.flexDirectionRow,
				globalStyles.gap8,
				isUser && styles.userWrapper,
			]}
		>
			{isUser ? <UserAvatar user={user} /> : <AIAvatar />}
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
