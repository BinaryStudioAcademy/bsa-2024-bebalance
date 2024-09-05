import { type ViewStyle } from "~/libs/types/types";

const sizeToStyles = {
	lg: { borderRadius: 160, height: 160, width: 160 } satisfies ViewStyle,
	md: { borderRadius: 100, height: 100, width: 100 } satisfies ViewStyle,
	slider: { borderRadius: 14, height: 14, width: 14 } satisfies ViewStyle,
	sm: { borderRadius: 86, height: 86, width: 86 } satisfies ViewStyle,
	xs: { borderRadius: 34, height: 34, width: 34 } satisfies ViewStyle,
	xxs: { borderRadius: 11, height: 11, width: 11 } satisfies ViewStyle,
};

export { sizeToStyles };
