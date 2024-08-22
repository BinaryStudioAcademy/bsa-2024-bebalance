import { type ViewStyle } from "~/libs/types/types";

const sizeToStyles = {
	lg: { borderRadius: 160, height: 160, width: 160 } satisfies ViewStyle,
	md: { borderRadius: 100, height: 100, width: 100 } satisfies ViewStyle,
	sm: { borderRadius: 86, height: 86, width: 86 } satisfies ViewStyle,
};

export { sizeToStyles };
