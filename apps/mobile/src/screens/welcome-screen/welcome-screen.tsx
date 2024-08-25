import React from "react";

import { RadioGroup, Text, View } from "~/libs/components/components";

const mockData = [
	{ label: "Family and relationships", value: "family" },
	{ label: "Career and professional growth", value: "career" },
	{ label: "Personal development and learning", value: "personal" },
	{ label: "Health and well-being", value: "health" },
	{ label: "Financial stability", value: "financial" },
];

const WelcomeScreen: React.FC = () => {
	return (
		<View>
			<Text>Welcome to the App!</Text>
			<RadioGroup options={mockData} />
		</View>
	);
};

export { WelcomeScreen };
