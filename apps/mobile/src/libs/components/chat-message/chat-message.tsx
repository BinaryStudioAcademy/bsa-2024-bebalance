import AIAvatar from "~/assets/svg/ai-avatar.svg";
import { Icon, Image, Text, View } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
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

const ICON_SIZE = 34;

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

	let Avatar;

	if (user?.avatarUrl) {
		Avatar = (
			<Image source={{ uri: user.avatarUrl }} style={styles.userImage} />
		);
	} else if (isUser) {
		Avatar = (
			<Icon
				color={BaseColor.LIGHT_GRAY}
				name="account-circle"
				size={ICON_SIZE}
			/>
		);
	} else {
		Avatar = <AIAvatar />;
	}

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
