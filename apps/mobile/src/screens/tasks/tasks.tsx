import React from "react";

import { ScreenWrapper, Text } from "~/libs/components/components";
import { useEffect } from "~/libs/hooks/hooks";
import { useAppDispatch } from "~/libs/hooks/use-app-dispatch/use-app-dispatch.hook";
import { actions as userActions } from "~/slices/users/users";

const Tasks: React.FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(userActions.loadAll());
	}, [dispatch]);

	return (
		<ScreenWrapper>
			<Text>Tasks</Text>
		</ScreenWrapper>
	);
};

export { Tasks };
