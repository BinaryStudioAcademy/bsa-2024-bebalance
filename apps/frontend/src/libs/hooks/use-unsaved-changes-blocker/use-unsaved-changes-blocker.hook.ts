import { useBlocker, useCallback } from "~/libs/hooks/hooks.js";

type Properties = {
	hasUncavedChanges: boolean;
	reset?: () => void;
};

type ReturnType = {
	blockerState: string;
	handlePopupCancel: () => void;
	handlePopupConfirm: () => void;
};

const useUnsavedChangesBlocker = ({
	hasUncavedChanges,
	reset,
}: Properties): ReturnType => {
	const blocker = useBlocker(({ currentLocation, nextLocation }) => {
		return (
			hasUncavedChanges && currentLocation.pathname !== nextLocation.pathname
		);
	});

	const handlePopupCancel = useCallback((): void => {
		if (blocker.state === "blocked") {
			blocker.reset();
		}
	}, [blocker]);

	const handlePopupConfirm = useCallback((): void => {
		if (reset) {
			reset();
		}

		if (blocker.state === "blocked") {
			blocker.proceed();
		}
	}, [blocker, reset]);

	return {
		blockerState: blocker.state,
		handlePopupCancel,
		handlePopupConfirm,
	};
};

export { useUnsavedChangesBlocker };
export { BLOCKED_BLOCKER_STATE } from "./libs/constants/constants.js";
