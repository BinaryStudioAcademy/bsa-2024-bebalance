import { type ValueOf } from "~/libs/types/types";
import { type NotificationFrequency } from "~/packages/users/users";

type NotificationQuestionsFormValues = {
	notificationFrequency: ValueOf<typeof NotificationFrequency>;
	userTaskDays: number[];
};

export { type NotificationQuestionsFormValues };
