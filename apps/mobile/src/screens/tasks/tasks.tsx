import React from "react";

import {
	ScreenWrapper,
	SliderContent,
	Tag,
	Text,
} from "~/libs/components/components";
import { useAppDispatch, useEffect } from "~/libs/hooks/hooks";
import { type colorToGradientColors } from "~/libs/maps/maps";
import { actions as userActions } from "~/slices/users/users";

const sliderData: {
	color: keyof typeof colorToGradientColors;
	label: string;
}[] = [{ color: "red", label: "Love" }];

const Tasks: React.FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(userActions.loadAll());
	}, [dispatch]);

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

			{sliderData.map((item, index) => (
				<SliderContent color={item.color} key={index} label={item.label} />
			))}
		</ScreenWrapper>
	);
};

export { Tasks };
