import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "~/app/components/components";
import { RouteName } from "~/app/enums/navigation";

const TabLayout = () => {
	return (
		<Tabs>
			<Tabs.Screen
				name={RouteName.HOME}
				options={{
					title: "Dashboard",
					tabBarIcon: (props) => <TabBarIcon name="home" {...props} />,
				}}
			/>
		</Tabs>
	);
};

export default TabLayout;
