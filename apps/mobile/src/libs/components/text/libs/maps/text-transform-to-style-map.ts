import { type TextStyle } from "~/libs/types/types";

const textTransformToStyleMap = {
	uppercase: { textTransform: "uppercase" } satisfies TextStyle,
};

export { textTransformToStyleMap };
