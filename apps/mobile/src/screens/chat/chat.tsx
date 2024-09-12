import {
	CheckboxCategoriesForm,
	ScreenWrapper,
	ScrollView,
	Text,
	View,
} from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type CategoriesSelectedRequestDto } from "~/libs/types/types";
import { actions as categoriesActions } from "~/slices/quiz/quiz";

import { ChatBox } from "./libs/components/components";
import { styles } from "./styles";

const Chat: React.FC = () => {
	const [submittedCategoryIds, setSubmittedCategoryIds] = useState<
		null | number[]
	>(null);
	const dispatch = useAppDispatch();
	const categories = useAppSelector((state) => state.quiz.categories);

	useEffect(() => {
		void dispatch(categoriesActions.getScores());
	}, [dispatch]);

	const handleRetakeQuizSubmit = useCallback(
		(payload: CategoriesSelectedRequestDto): void => {
			setSubmittedCategoryIds(payload.categoryIds);
			// TODO: send selectedCategoriesSubmissionData to backend
		},
		[],
	);

	return (
		<View style={[globalStyles.flex1, styles.container]}>
			<ScreenWrapper>
				<ScrollView
					style={[
						globalStyles.flex1,
						globalStyles.pl24,
						globalStyles.pt24,
						globalStyles.pr16,
						globalStyles.pb12,
					]}
				>
					<View
						style={[globalStyles.flex1, globalStyles.gap12, globalStyles.p12]}
					>
						<ChatBox style={[globalStyles.p16, globalStyles.gap8]}>
							<Text>
								Do you want to work on 3 fields, with the lowest score, or you
								want to choose the fields yourself to work on?
							</Text>
							<CheckboxCategoriesForm
								categories={categories}
								onSubmit={handleRetakeQuizSubmit}
								submitButtonName="Update fields"
							/>
						</ChatBox>
						<Text color={BaseColor.BLACK}>
							{submittedCategoryIds?.join(", ")}
						</Text>
					</View>
				</ScrollView>
			</ScreenWrapper>
		</View>
	);
};

export { Chat };
