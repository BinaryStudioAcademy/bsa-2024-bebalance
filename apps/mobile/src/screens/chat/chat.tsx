import React from "react";

import {
	CategoriesForm,
	LoaderWrapper,
	ScreenWrapper,
} from "~/libs/components/components";
import { DataStatus } from "~/libs/enums/enums";
import { useAppSelector } from "~/libs/hooks/hooks";

const Chat: React.FC = () => {
	const { dataStatus } = useAppSelector((state) => state.quiz);

	return (
		<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
			<ScreenWrapper>
				<CategoriesForm />
			</ScreenWrapper>
		</LoaderWrapper>
	);
};

export { Chat };
