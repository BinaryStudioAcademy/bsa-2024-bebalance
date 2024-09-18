const getTimeLeft = (currentTime: number, deadline: string): number => {
	const deadlineTime = new Date(deadline).getTime();

	return deadlineTime - currentTime;
};

export { getTimeLeft };
