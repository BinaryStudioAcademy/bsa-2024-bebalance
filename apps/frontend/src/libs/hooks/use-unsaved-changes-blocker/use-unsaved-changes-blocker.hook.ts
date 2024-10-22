import { BLOCKED_BLOCKER_STATE } from "~/libs/constants/constants.js";
import { useBlocker, useCallback, useEffect } from "~/libs/hooks/hooks.js";

type Properties = {
	hasUnsavedChanges: boolean;
	reset?: () => void;
};

type ReturnType = {
	handlePopupCancel: () => void;
	handlePopupConfirm: () => void;
	isBlocked: boolean;
};

const useUnsavedChangesBlocker = ({
	hasUnsavedChanges,
	reset,
}: Properties): ReturnType => {
	const blocker = useBlocker(({ currentLocation, nextLocation }) => {
		return (
			hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname
		);
	});

	const handlePopupCancel = useCallback((): void => {
		if (blocker.state === BLOCKED_BLOCKER_STATE) {
			blocker.reset();
		}
	}, [blocker]);

	const handlePopupConfirm = useCallback((): void => {
		reset?.();

		if (blocker.state === BLOCKED_BLOCKER_STATE) {
			blocker.proceed();
		}
	}, [blocker, reset]);

	const handleBeforeUnload = useCallback(
		(event: BeforeUnloadEvent): void => {
			if (hasUnsavedChanges) {
				event.preventDefault();
				event.returnValue = "Reload site?";
			}
		},
		[hasUnsavedChanges],
	);

	useEffect(() => {
		window.addEventListener("beforeunload", handleBeforeUnload);

		return (): void => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [handleBeforeUnload]);

	return {
		handlePopupCancel,
		handlePopupConfirm,
		isBlocked: blocker.state === BLOCKED_BLOCKER_STATE,
	};
};

export { useUnsavedChangesBlocker };
