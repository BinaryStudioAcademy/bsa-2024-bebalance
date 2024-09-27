import React from "react";

import {
	ChatMessage,
	CheckboxCategoriesForm,
} from "~/libs/components/components";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks";
import { type CategoriesSelectedRequestDto } from "~/libs/types/types";
import { ChatMessageAuthor } from "~/packages/chat/chat";
import { actions as chatActions } from "~/slices/chat/chat";

import { CHECKBOX_SELECTOR_TEXT } from "./libs/constants/constants";
import { getSelectedCategoriesHelper } from "./libs/helpers/helpers";

const CheckBoxButtons: React.FC = () => {
	const dispatch = useAppDispatch();

	const quizCategories = useAppSelector((state) => state.quiz.scores);

	const handleFormSubmit = useCallback(
		(payload: CategoriesSelectedRequestDto): void => {
			const { categoryIds } = payload;

			const newSelectedCategories = getSelectedCategoriesHelper(
				quizCategories,
				categoryIds,
			);

			void dispatch(
				chatActions.updateSelectedCategories(newSelectedCategories),
			);

			const taskPayload = {
				categories: newSelectedCategories,
				messages: [],
			};

			void dispatch(chatActions.getTasksForCategories(taskPayload));
			dispatch(
				chatActions.addTextMessage({
					author: ChatMessageAuthor.USER,
					text: "Confirm tasks generation",
				}),
			);
		},
		[dispatch, quizCategories],
	);

	return (
		<ChatMessage text={CHECKBOX_SELECTOR_TEXT}>
			<CheckboxCategoriesForm
				categories={quizCategories}
				onSubmit={handleFormSubmit}
				submitButtonLabel="Confirm"
			/>
		</ChatMessage>
	);
};

export { CheckBoxButtons };
