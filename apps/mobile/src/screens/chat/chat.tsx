import React from "react";

import { LoaderWrapper, ScreenWrapper } from "~/libs/components/components";
import { DataStatus } from "~/libs/enums/enums";
import { useAppSelector } from "~/libs/hooks/hooks";

import { CategoriesForm } from "./components/categories-form";

const Chat: React.FC = () => {
	const { dataStatus } = useAppSelector((state) => state.quiz);

	return (
		<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
			<ScreenWrapper>
				<ScreenWrapper>
					<CategoriesForm />
				</ScreenWrapper>
			</ScreenWrapper>
		</LoaderWrapper>
	);
};

export { Chat };
