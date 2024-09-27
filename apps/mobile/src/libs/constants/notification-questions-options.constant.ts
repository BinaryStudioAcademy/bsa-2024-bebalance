import { NotificationFrequency } from "~/packages/users/users";

const TASK_DAYS_OPTIONS = [
	{ id: 1, label: "Monday" },
	{ id: 2, label: "Tuesday" },
	{ id: 3, label: "Wednesday" },
	{ id: 4, label: "Thursday" },
	{ id: 5, label: "Friday" },
	{ id: 6, label: "Saturday" },
	{ id: 7, label: "Sunday" },
];

const NOTIFICATION_FREQUENCY_OPTIONS = [
	{
		label: "Yes, I’d love daily motivation!",
		value: NotificationFrequency.ALL,
	},
	{
		label: "No, I prefer not to receive motivational follow-ups",
		value: NotificationFrequency.NONE,
	},
];

export { NOTIFICATION_FREQUENCY_OPTIONS, TASK_DAYS_OPTIONS };
