import type { TextStyle } from "react-native";

const sizeToStyleMap = {
	lg: { fontSize: 20, lineHeight: 25 } satisfies TextStyle,
	md: { fontSize: 16, lineHeight: 22 } satisfies TextStyle,
	sm: { fontSize: 14, lineHeight: 19 } satisfies TextStyle,
	xl: { fontSize: 24, lineHeight: 26 } satisfies TextStyle,
	xs: { fontSize: 12, lineHeight: 16 } satisfies TextStyle,
	xxl: { fontSize: 32, lineHeight: 40 } satisfies TextStyle,
};

export { sizeToStyleMap };
