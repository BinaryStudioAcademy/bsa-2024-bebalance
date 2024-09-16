import React from "react";

import {
	BackgroundWrapper,
	Button,
	InfinitePager,
	ScreenWrapper,
	Text,
	View,
} from "~/libs/components/components";
import { NumericalValue, RootScreenName } from "~/libs/enums/enums";
import {
	useAppDispatch,
	useAppForm,
	useCallback,
	useNavigation,
	useRef,
	useState,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type InfinitePagerImperativeApi,
	type NativeStackNavigationProp,
} from "~/libs/types/types";
import {
	type NotificationAnswersPayloadDto,
	notificationAnswersValidationSchema,
} from "~/packages/users/users";
import { actions as userActions } from "~/slices/users/users";

import {
	NotificationFrequencyQuestion,
	NotificationTaskDays,
} from "./libs/components/components";
import { NOTIFICATION_QUESTIONS_FORM_DEFAULT_VALUES } from "./libs/constants/constants";
import {
	type NotificationQuestionsFormValues,
	type RootStackParameterList,
} from "./libs/types/types";
import { styles } from "./styles";

const NotificationQuestions: React.FC = () => {
	const dispatch = useAppDispatch();
	const infinitePagerReference = useRef<InfinitePagerImperativeApi | null>(
		null,
	);
	const [currentStep, setCurrentStep] = useState<number>(NumericalValue.ZERO);

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParameterList>>();

	const { control, errors, handleSubmit, isValid } =
		useAppForm<NotificationQuestionsFormValues>({
			defaultValues: NOTIFICATION_QUESTIONS_FORM_DEFAULT_VALUES,
			validationSchema: notificationAnswersValidationSchema,
		});

	const handleStepChange = useCallback((direction: "back" | "next"): void => {
		setCurrentStep(
			direction === "next" ? NumericalValue.ONE : NumericalValue.ZERO,
		);
		infinitePagerReference.current?.[
			direction === "next" ? "incrementPage" : "decrementPage"
		]({ animated: true });
	}, []);

	const handleBackPress = useCallback((): void => {
		handleStepChange("back");
	}, [handleStepChange]);

	const handleSaveAnswers = useCallback(
		(payload: NotificationAnswersPayloadDto): void => {
			void dispatch(userActions.saveNotificationAnswers(payload));
		},
		[dispatch],
	);

	const handleFormSubmit = useCallback((): void => {
		if (currentStep === NumericalValue.ZERO) {
			handleStepChange("next");

			return;
		}

		void handleSubmit(handleSaveAnswers)();
		navigation.navigate(RootScreenName.WHEEL_LOADING);
	}, [
		currentStep,
		handleSubmit,
		handleSaveAnswers,
		navigation,
		handleStepChange,
	]);

	const onPageRender = useCallback(() => {
		return currentStep === NumericalValue.ZERO ? (
			<NotificationTaskDays control={control} errors={errors} />
		) : (
			<NotificationFrequencyQuestion control={control} errors={errors} />
		);
	}, [currentStep, control, errors]);

	return (
		<BackgroundWrapper>
			<ScreenWrapper>
				<View
					style={[
						globalStyles.flex1,
						globalStyles.mb16,
						globalStyles.mh12,
						globalStyles.mt32,
						globalStyles.ph16,
						globalStyles.pb16,
						styles.container,
					]}
				>
					<View
						style={[
							globalStyles.flex1,
							globalStyles.justifyContentSpaceBetween,
						]}
					>
						<View>
							<Text
								size="xl"
								style={[globalStyles.mb48, globalStyles.mt12, styles.title]}
								weight="bold"
							>
								And the last step
							</Text>
							<InfinitePager
								infinitePagerReference={infinitePagerReference}
								onPageRender={onPageRender}
							/>
						</View>

						<View style={globalStyles.gap16}>
							<Button
								isDisabled={currentStep === NumericalValue.ONE && !isValid}
								label={currentStep === NumericalValue.ZERO ? "NEXT" : "SAVE"}
								onPress={handleFormSubmit}
							/>
							{currentStep === NumericalValue.ONE && (
								<Button
									appearance="outlined"
									label="BACK"
									onPress={handleBackPress}
								/>
							)}
						</View>
					</View>
				</View>
			</ScreenWrapper>
		</BackgroundWrapper>
	);
};

export { NotificationQuestions };
