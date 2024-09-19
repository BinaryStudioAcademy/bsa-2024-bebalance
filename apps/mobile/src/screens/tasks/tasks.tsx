import React from "react";

import {
	LoaderWrapper,
	ScreenWrapper,
	TaskCard,
} from "~/libs/components/components";
import { BaseColor, DataStatus } from "~/libs/enums/enums";
import { useAppDispatch, useAppSelector, useEffect } from "~/libs/hooks/hooks";
import { type UserDto } from "~/packages/users/users";
import { actions as taskActions } from "~/slices/task/task";
import { actions as userActions } from "~/slices/users/users";

const Tasks: React.FC = () => {
	const dispatch = useAppDispatch();

	const authenticatedUser = useAppSelector(({ auth }) => auth.user);
	const { dataStatus, tasks } = useAppSelector(({ tasks }) => tasks);

	useEffect(() => {
		void dispatch(
			userActions.getById({ id: (authenticatedUser as UserDto).id }),
		);
	}, [dispatch, authenticatedUser]);

	useEffect(() => {
		void dispatch(taskActions.getCurrentTasks());
	}, [dispatch]);

	return (
		<ScreenWrapper style={{ backgroundColor: BaseColor.BG_WHITE }}>
			<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
				{tasks.map((task) => (
					<TaskCard key={task.id} task={task} />
				))}
			</LoaderWrapper>
		</ScreenWrapper>
	);
};

export { Tasks };
