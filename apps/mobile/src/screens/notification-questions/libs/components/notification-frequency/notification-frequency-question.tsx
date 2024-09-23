import React from "react";

import { RadioGroup, Text } from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";
import {
	type Control,
	type FieldErrors,
	type FieldValues,
} from "~/libs/types/types";

import { NOTIFICATION_FREQUENCY_OPTIONS } from "../../constants/constants";
import { type NotificationQuestionsFormValues } from "../../types/types";
import { styles } from "./styles";

type Properties<T extends FieldValues> = {
	control: Control<T>;
	errors: FieldErrors<T>;
};

const NotificationFrequencyQuestion: React.FC<
	Properties<NotificationQuestionsFormValues>
> = ({ control, errors }) => {
	return (
		<>
			<Text
				preset="subheading"
				style={[globalStyles.mb48, globalStyles.mt12, styles.title]}
				weight="bold"
			>
				How often would you like to receive motivational follow-ups?
			</Text>
			<RadioGroup
				control={control}
				errors={errors}
				itemContainerStyle={globalStyles.mb16}
				name="notificationFrequency"
				options={NOTIFICATION_FREQUENCY_OPTIONS}
			/>
		</>
	);
};

export { NotificationFrequencyQuestion };
