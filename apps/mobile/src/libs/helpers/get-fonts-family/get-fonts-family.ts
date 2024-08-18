import { fontFamilies } from "~/libs/enums/fonts/fonts-families.enum";

const getFontFamily = (
	fontFamily: "INTER" | "LATO" | "NUNITO",
	weight: "bold" | "extraBold" | "medium" | "regular" | "semiBold",
) => {
	return (fontFamilies[fontFamily] as { [key in typeof weight]: string })[
		weight
	];
};

export { getFontFamily };
