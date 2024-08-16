import { StyleSheet, View, Text } from 'react-native';

const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<Text>This is a Balance Wheel app</Text>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
