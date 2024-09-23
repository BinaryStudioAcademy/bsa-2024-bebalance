import { NavLink } from "react-router-dom";

import { type AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions as unsavedChangesActions } from "~/modules/unsaved-changes/unsaved-changes.js";

import { type LinkType } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	isActive?: boolean;
	to: ValueOf<typeof AppRoute>;
	type?: LinkType;
};

const Link: React.FC<Properties> = ({
	children,
	isActive,
	to,
	type,
}: Properties) => {
	const { hasUnsavedChanges } = useAppSelector(
		({ unsavedChanges }) => unsavedChanges,
	);
	const dispatch = useAppDispatch();

	const handleNavigate = useCallback(
		(event: React.MouseEvent<HTMLAnchorElement>): void => {
			if (hasUnsavedChanges) {
				event.preventDefault();
				dispatch(unsavedChangesActions.setUserCanceledSaving(false));
				dispatch(unsavedChangesActions.setNextNavigation(to));
			}
		},
		[dispatch, hasUnsavedChanges, to],
	);

	return (
		<NavLink
			className={getValidClassNames(styles["link"], type && styles[type])}
			onClick={handleNavigate}
			to={to}
		>
			<span
				className={getValidClassNames(
					styles["content-container"],
					isActive && type && styles[`${type}-active`],
				)}
			>
				{children}
			</span>
		</NavLink>
	);
};

export { Link };
