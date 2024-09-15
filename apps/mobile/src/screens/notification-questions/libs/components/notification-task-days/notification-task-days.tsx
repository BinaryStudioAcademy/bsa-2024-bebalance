import React from "react";

import {
	MultipleCheckboxInput,
	Text,
	View,
} from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";
import {
	type Control,
	type FieldErrors,
	type FieldValues,
} from "~/libs/types/types";

import { TASK_DAYS_OPTIONS } from "../../constants/constants";
import { type NotificationQuestionsFormValues } from "./../../types/types";
import { styles } from "./styles";

type Properties<T extends FieldValues> = {
	control: Control<T>;
	errors: FieldErrors<T>;
};

const NotificationTaskDays: React.FC<
	Properties<NotificationQuestionsFormValues>
> = ({ control, errors }) => {
	return (
		<>
			<Text
				preset="subheading"
				style={[globalStyles.mb48, globalStyles.mt12, styles.title]}
				weight="bold"
			>
				Which days would you like to receive tasks?
			</Text>
			<View style={[globalStyles.gap16, globalStyles.mb24]}>
				<MultipleCheckboxInput
					control={control}
					errors={errors}
					name="userTaskDays"
					options={TASK_DAYS_OPTIONS}
				/>
			</View>
		</>
	);
};

export { NotificationTaskDays };
