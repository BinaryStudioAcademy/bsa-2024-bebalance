import { FlatList, ScreenWrapper, View } from "~/libs/components/components";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type ChatMessageDto,
	type TaskMessage,
	type TextMessage,
} from "~/packages/chat/chat";
import { actions as chatActions } from "~/slices/chat/chat";

import {
	ChatBox,
	ChatButtons,
	InitialChatMessage,
	Loader,
} from "./libs/components/components";
import { styles } from "./styles";

type ChatMessageItem = Omit<
	ChatMessageDto<TaskMessage[] | TextMessage>,
	"createdAt" | "id" | "threadId" | "updatedAt"
>;

const Chat: React.FC = () => {
	const dispatch = useAppDispatch();

	const threadId = useAppSelector((state) => state.chat.threadId);
	const dataStatus = useAppSelector((state) => state.chat.dataStatus);
	const messages = useAppSelector((state) => state.chat.messages);

	useEffect(() => {
		void dispatch(chatActions.initConversation());
	}, [dispatch]);

	const isLoading = dataStatus === "pending";

	const handleRenderItem = useCallback(
		({ item }: { item: ChatMessageItem }) => {
			return (
				<ChatBox author={item.author} payload={item.payload} type={item.type} />
			);
		},
		[],
	);

	const handleKeyExtractor = useCallback(
		(item: ChatMessageItem, index: number) => index.toString(),
		[],
	);

	return (
		<ScreenWrapper
			edges={["left", "right"]}
			style={[globalStyles.flex1, styles.container]}
		>
			<View
				style={[
					globalStyles.flex1,
					globalStyles.pl4,
					globalStyles.pr16,
					globalStyles.pb12,
				]}
			>
				<View
					style={[
						globalStyles.gap12,
						globalStyles.ph12,
						globalStyles.flexDirectionColumn,
					]}
				>
					<FlatList
						contentContainerStyle={[
							globalStyles.gap8,
							globalStyles.pt24,
							globalStyles.pb8,
							styles.screenWrapper,
						]}
						data={messages}
						inverted
						keyExtractor={handleKeyExtractor}
						ListFooterComponent={
							<>{isLoading ? <Loader /> : threadId && <ChatButtons />}</>
						}
						ListHeaderComponent={threadId ? <InitialChatMessage /> : null}
						renderItem={handleRenderItem}
					/>
				</View>
			</View>
		</ScreenWrapper>
	);
};

export { Chat };
