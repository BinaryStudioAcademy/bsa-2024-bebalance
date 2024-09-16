import { type TextStyle } from "~/libs/types/types";

const sizeToTextStyle = {
	lg: { fontSize: 20, lineHeight: 25 } satisfies TextStyle,
	md: { fontSize: 16, lineHeight: 22 } satisfies TextStyle,
	sm: { fontSize: 14, lineHeight: 19 } satisfies TextStyle,
	xl: { fontSize: 24, lineHeight: 26 } satisfies TextStyle,
	xs: { fontSize: 12, lineHeight: 16 } satisfies TextStyle,
	xxl: { fontSize: 32, lineHeight: 40 } satisfies TextStyle,
	xxs: { fontSize: 10, lineHeight: 14 } satisfies TextStyle,
};

export { sizeToTextStyle };
