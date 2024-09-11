import React from "react";
import { default as RNInfinitePager } from "react-native-infinite-pager";

import { NumericalValue } from "~/libs/enums/enums";
import { type InfinitePagerImperativeApi } from "~/libs/types/types";

import { getPageInterpolatorSlide } from "./libs/animations/animations";
import { ANIMATION_CONFIG } from "./libs/constants/constants";

type Properties = {
	infinitePagerReference: React.MutableRefObject<InfinitePagerImperativeApi | null>;
	onPageRender: () => JSX.Element;
};

const InfinitePager = ({
	infinitePagerReference,
	onPageRender,
}: Properties): JSX.Element => {
	return (
		<RNInfinitePager
			animationConfig={ANIMATION_CONFIG}
			gesturesDisabled
			pageBuffer={NumericalValue.ONE}
			PageComponent={onPageRender}
			pageInterpolator={getPageInterpolatorSlide}
			ref={infinitePagerReference}
		/>
	);
};

export { InfinitePager };
