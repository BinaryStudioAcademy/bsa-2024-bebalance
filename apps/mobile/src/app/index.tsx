import { Redirect } from "expo-router";

import { useAppSelector } from "~/app/hooks/hooks";

const Index = () => {
	const isAuthenticated = useAppSelector((state) => Boolean(state.auth.user));

	return (
		<Redirect href={isAuthenticated ? "/(tabs)/home" : "/(auth)/sign-up"} />
	);
};

export default Index;
