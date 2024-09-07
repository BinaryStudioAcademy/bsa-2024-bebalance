import { View } from "react-native";

import {
	BackgroundWrapper,
	LoaderWrapper,
	ScreenWrapper,
} from "~/libs/components/components";
import { RadioGroup } from "~/libs/components/radio-group/radio-group";
import { DataStatus } from "~/libs/enums/app/data-status.enum";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { categoryAnswerSelectedValidationSchema } from "~/packages/quiz/quiz";
import { actions as quizActions } from "~/slices/quiz/quiz";

import { Counter } from "./libs/components/components";
import { QUIZ_FORM_DEFAULT_VALUES } from "./libs/constants/costants";
import { type QuizFormValues } from "./libs/types/types";
import { styles } from "./styles";

const Quiz: React.FC = () => {
	const dispatch = useAppDispatch();

	const { category, currentCategoryIndex, dataStatus, questions } =
		useAppSelector(({ quiz }) => ({
			category: quiz.currentCategory,
			currentCategoryIndex: quiz.currentCategoryIndex,
			dataStatus: quiz.dataStatus,
			questions: quiz.questions,
		}));

	useEffect(() => {
		void dispatch(quizActions.getAllQuestions());
	}, [dispatch]);

	const { control, errors, handleSubmit } = useAppForm<QuizFormValues>({
		defaultValues: QUIZ_FORM_DEFAULT_VALUES,
		validationSchema: categoryAnswerSelectedValidationSchema,
	});

	console.log(`QUESTIONS`, questions);

	// const mappedAnswersToRadioOptions: {
	// 	label: string;
	// 	value: string;
	// }[] = questions?.answers
	// 	? question.answers.map((answer: OnboardingAnswerDto) => ({
	// 			label: answer.label,
	// 			value: answer.id.toString(),
	// 		}))
	// 	: [];

	return (
		<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
			<BackgroundWrapper>
				<ScreenWrapper>
					<View
						style={[
							globalStyles.flex1,
							globalStyles.justifyContentCenter,
							globalStyles.mb16,
							globalStyles.mh12,
							globalStyles.mt32,
							globalStyles.p12,
							styles.container,
						]}
					>
						<Counter currentStep={1} totalSteps={24} />
						{/*<RadioGroup*/}
						{/*	control={control}*/}
						{/*	errors={errors}*/}
						{/*	options={}*/}
						{/*	name="answer"*/}
						{/*/>*/}
					</View>
				</ScreenWrapper>
			</BackgroundWrapper>
		</LoaderWrapper>
	);
};

export { Quiz };
