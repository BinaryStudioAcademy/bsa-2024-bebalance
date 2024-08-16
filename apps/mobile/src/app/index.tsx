import { Redirect } from 'expo-router';

import { useAppSelector } from '@app/hooks/hooks';
import { selectIsAuthenticated } from '@app/store/auth/auth-slice';

const Index = () => {
	const isAuthenticated = useAppSelector(state => selectIsAuthenticated(state));

	return (
		<Redirect href={isAuthenticated ? '/(tabs)/home' : '/(auth)/sign-in'} />
	);
};

export default Index;
