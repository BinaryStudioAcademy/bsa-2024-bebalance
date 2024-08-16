import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@app/components/components';

const TabLayout = () => {
	return (
		<Tabs>
			<Tabs.Screen
				name="home"
				options={{
					title: 'Dashboard',
					tabBarIcon: props => <TabBarIcon name="home" {...props} />,
				}}
			/>
		</Tabs>
	);
};

export default TabLayout;
