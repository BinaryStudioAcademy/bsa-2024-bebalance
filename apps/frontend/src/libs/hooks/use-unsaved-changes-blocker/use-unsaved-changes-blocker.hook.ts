import { BLOCKED_BLOCKER_STATE } from "~/libs/constants/blocked-blocker-state.constant.js";
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
		if (blocker.state === BLOCKED_BLOCKER_STATE) {
			blocker.reset();
		}
	}, [blocker]);

	const handlePopupConfirm = useCallback((): void => {
		if (reset) {
			reset();
		}

		if (blocker.state === BLOCKED_BLOCKER_STATE) {
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
