import { type ComponentProps } from "react";
import { notificationAnswersValidationSchema } from "shared";

import type { NotificationQuestionsFormValues } from "~/screens/notification-questions/libs/types/notification-questions-form-values.type";

import {
	Button,
	MultipleCheckboxInput,
	RadioGroup,
	ScreenWrapper,
	Text,
	View,
} from "~/libs/components/components";
import {
	useAppDispatch,
	useAppForm,
	useCallback,
	useState,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { NOTIFICATION_QUESTIONS_FORM_DEFAULT_VALUES } from "~/screens/notification-questions/libs/constants/notification-questions-form-default-values.constant";
import { NOTIFICATION_FREQUENCY_OPTIONS } from "~/screens/notification-questions/libs/constants/notification-questions-options.constant";
import { actions as authActions } from "~/slices/auth/auth";

import { SignOutModal } from "./libs/components/components";
import { styles } from "./styles";

const TASK_DAYS_OPTIONS = [
	{ id: 1, label: "Monday" },
	{ id: 2, label: "Tuesday" },
	{ id: 3, label: "Wednesday" },
	{ id: 4, label: "Thursday" },
	{ id: 5, label: "Friday" },
	{ id: 6, label: "Saturday" },
	{ id: 7, label: "Sunday" },
];

const Settings: React.FC = () => {
	const dispatch = useAppDispatch();
	const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
		useState<boolean>(false);

	const { control, errors } = useAppForm<NotificationQuestionsFormValues>({
		defaultValues: NOTIFICATION_QUESTIONS_FORM_DEFAULT_VALUES,
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

	return (
		<ScreenWrapper edges={["top"]}>
			<View style={[globalStyles.flex1, globalStyles.p16, styles.container]}>
				<Text preset="heading" weight="bold" style={globalStyles.mb24}>
					Settings
				</Text>
				<Text preset="subheading" weight="bold" style={globalStyles.mb12}>
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
					style={[globalStyles.flex1, globalStyles.justifyContentSpaceBetween]}
				>
					<View style={[styles.radioContainer, globalStyles.pb32]}>
						<RadioGroup
							control={control}
							errors={errors}
							itemContainerStyle={globalStyles.mb16}
							name="notificationFrequency"
							options={NOTIFICATION_FREQUENCY_OPTIONS}
						/>
						<View style={globalStyles.mt32}>
							<Button appearance="outlined" label="Save" onPress={() => {}} />
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
		</ScreenWrapper>
	);
};

export { Settings };
