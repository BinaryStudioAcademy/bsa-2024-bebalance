import { NotificationFrequency } from "~/modules/users/users.js";

const SETTINGS_NOTIFICATION_FREQUENCY_OPTIONS = [
	{
		label: "Yes, I’d love daily motivation!",
		value: NotificationFrequency.ALL,
	},
	{
		label: "No, I prefer not to receive motivational follow-ups.",
		value: NotificationFrequency.NONE,
	},
];

export { SETTINGS_NOTIFICATION_FREQUENCY_OPTIONS };
