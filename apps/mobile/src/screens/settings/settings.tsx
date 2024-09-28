import { type ComponentProps } from "react";

import {
	Button,
	MultipleCheckboxInput,
	RadioGroup,
	ScreenWrapper,
	ScrollView,
	Text,
	View,
} from "~/libs/components/components";
import {
	NOTIFICATION_FREQUENCY_OPTIONS,
	TASK_DAYS_OPTIONS,
} from "~/libs/constants/constants";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useState,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type NotificationQuestionsFormValues,
	type ValueOf,
} from "~/libs/types/types";
import {
	type NotificationAnswersPayloadDto,
	notificationAnswersValidationSchema,
	type NotificationFrequency,
	type UserDto,
} from "~/packages/users/users";
import { actions as authActions } from "~/slices/auth/auth";
import { actions as userActions } from "~/slices/users/users";

import { SignOutModal } from "./libs/components/components";
import { styles } from "./styles";

const Settings: React.FC = () => {
	const dispatch = useAppDispatch();
	const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
		useState<boolean>(false);

	const user = useAppSelector((state) => state.auth.user) as UserDto;
	const dataStatus = useAppSelector((state) => state.auth.dataStatus);

	const { control, errors, handleSubmit, isDirty, isValid } =
		useAppForm<NotificationQuestionsFormValues>({
			defaultValues: {
				notificationFrequency: user.notificationFrequency as ValueOf<
					typeof NotificationFrequency
				>,
				userTaskDays: user.userTaskDays as number[],
			},
			validationSchema: notificationAnswersValidationSchema,
		});

	const handleModalDismiss = useCallback((): void => {
		setIsConfirmationModalVisible(false);
	}, []);

	const handleModalShow = useCallback((): void => {
		setIsConfirmationModalVisible(true);
	}, []);

	const handleSignOut = useCallback(
		() => void dispatch(authActions.signOut()),
		[dispatch],
	);

	const modalButtonsConfiguration: ComponentProps<
		typeof SignOutModal
	>["buttonsConfiguration"] = [
		{
			appearance: "outlined",
			label: "Yes",
			onPress: handleSignOut,
		},
		{
			appearance: "filled",
			label: "No",
			onPress: handleModalDismiss,
		},
	];

	const handleSaveAnswers = useCallback(
		(payload: NotificationAnswersPayloadDto): void => {
			void dispatch(userActions.saveNotificationAnswers(payload));
		},
		[dispatch],
	);

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit(handleSaveAnswers)();
	}, [handleSubmit, handleSaveAnswers]);

	const isLoading = dataStatus === "pending";

	return (
		<ScreenWrapper edges={["top"]}>
			<Text
				preset="subheading"
				style={[globalStyles.pv12, globalStyles.ph16, styles.container]}
				weight="bold"
			>
				Settings
			</Text>
			<ScrollView
				contentContainerStyle={globalStyles.flexGrow1}
				showsVerticalScrollIndicator={false}
			>
				<View style={[globalStyles.flex1, globalStyles.p16, styles.container]}>
					<Text preset="subheading" style={globalStyles.mb12} weight="bold">
						Days to receive tasks
					</Text>

					<View
						style={[
							globalStyles.flexDirectionRow,
							globalStyles.justifyContentSpaceBetween,
							globalStyles.gap8,
							styles.checkboxWrapper,
						]}
					>
						<MultipleCheckboxInput
							checkAllLabel=""
							checkboxStyle={[styles.checkbox, globalStyles.pv8]}
							containerStyle={styles.checkboxContainer}
							control={control}
							errors={errors}
							name="userTaskDays"
							options={TASK_DAYS_OPTIONS}
						/>
					</View>

					<Text
						preset="subheading"
						style={[globalStyles.mb12, globalStyles.mt24]}
						weight="bold"
					>
						Notification frequency
					</Text>

					<View
						style={[
							globalStyles.flex1,
							globalStyles.justifyContentSpaceBetween,
						]}
					>
						<View
							style={[
								styles.radioContainer,
								globalStyles.pb24,
								globalStyles.mb24,
							]}
						>
							<RadioGroup
								control={control}
								errors={errors}
								itemContainerStyle={globalStyles.mb16}
								name="notificationFrequency"
								options={NOTIFICATION_FREQUENCY_OPTIONS}
							/>
							<View style={globalStyles.mt32}>
								<Button
									appearance="outlined"
									isDisabled={!isValid || !isDirty || isLoading}
									label="Save"
									onPress={handleFormSubmit}
								/>
							</View>
						</View>

						<Button
							iconLeftName="exit-to-app"
							label="SIGN OUT"
							onPress={handleModalShow}
						/>
					</View>
				</View>
				<SignOutModal
					buttonsConfiguration={modalButtonsConfiguration}
					isVisible={isConfirmationModalVisible}
					onBackdropPress={handleModalDismiss}
				/>
			</ScrollView>
		</ScreenWrapper>
	);
};

export { Settings };
