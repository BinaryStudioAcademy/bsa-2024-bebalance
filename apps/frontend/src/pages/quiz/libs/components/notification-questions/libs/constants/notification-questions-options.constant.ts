const TASK_DAYS_OPTIONS = [
	{ label: "Monday", value: 1 },
	{ label: "Tuesday", value: 2 },
	{ label: "Wednesday", value: 3 },
	{ label: "Thursday", value: 4 },
	{ label: "Friday", value: 5 },
	{ label: "Saturday", value: 6 },
	{ label: "Sunday", value: 7 },
];

const NOTIFICATION_FREQUENCY_OPTIONS = [
	{ label: "Yes, I’d love daily motivation!", value: "true" },
	{
		label: "No, I prefer not to receive motivational follow-ups",
		value: "false",
	},
];

export { NOTIFICATION_FREQUENCY_OPTIONS, TASK_DAYS_OPTIONS };
