import React from "react";

import { ScreenWrapper, Tag, Text } from "~/libs/components/components";
import { useAppDispatch, useAppSelector, useEffect } from "~/libs/hooks/hooks";
import { type UserDto } from "~/packages/users/users";
import { actions as userActions } from "~/slices/users/users";

const Tasks: React.FC = () => {
	const dispatch = useAppDispatch();

	const authenticatedUser = useAppSelector(({ auth }) => auth.user);

	useEffect(() => {
		void dispatch(
			userActions.getById({ id: (authenticatedUser as UserDto).id }),
		);
	}, [dispatch, authenticatedUser]);

	return (
		<ScreenWrapper>
			<Text>Tasks</Text>
			{/* TODO: Replace these static categories with categories from the Backend in the future */}
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
