import { ReactNode } from "react";
import { View } from "react-native";

import { BackgroundImage } from "~/libs/components/background/components/background-image/background-image";

import { Dot } from "./components/dot/dot";
import { Planet } from "./components/planet/planet";
import { styles } from "./styles";

type Properties = {
	children: ReactNode;
};

const Background = ({ children }: Properties) => {
	return (
		<View style={styles.container}>
			<BackgroundImage position={{ bottom: "-65%", right: "2%" }} />
			<Dot position={{ left: "10%", top: "50%" }} />
			<Dot position={{ left: "5%", top: "10%" }} />
			<Dot position={{ bottom: "20%", right: "10%" }} />
			<Dot position={{ right: "10%", top: "20%" }} />
			<Planet color={"pink"} size={"sm"} style={{ bottom: 100, left: 20 }} />
			<Planet
				color={"green"}
				direction={"topToBottom"}
				size={"lg"}
				style={{ left: 20, top: 10 }}
			/>
			{children}
			<Planet
				color={"blue"}
				direction={"topToBottom"}
				size={"md"}
				style={{ bottom: "50%", left: "50%" }}
			/>
			<BackgroundImage position={{ left: "20%", top: "-50%" }} />
		</View>
	);
};

export { Background };
