import React from "react";

import { ScreenWrapper, Tag, Text } from "~/libs/components/components";
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
			<Tag color="red" label="Love" />
			<Tag color="violet" label="Friends" />
			<Tag color="lime" label="Work" />
			<Tag color="yellow" label="Physical" />
			<Tag color="green" label="Money" />
			<Tag color="pink" label="Free time" />
			<Tag color="orange" label="Spiritual" />
			<Tag color="blue" label="Mental" />
		</ScreenWrapper>
	);
};

export { Tasks };
