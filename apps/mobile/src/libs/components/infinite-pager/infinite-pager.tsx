import React from "react";
import { default as RNInfinitePager } from "react-native-infinite-pager";

import { PREVIOUS_INDEX_OFFSET } from "~/libs/constants/constants";
import { type InfinitePagerImperativeApi } from "~/libs/types/types";

import { getPageInterpolatorSlide } from "./libs/animations/animations";
import { ANIMATION_CONFIG } from "./libs/constants/constants";

type Properties = {
	infinitePagerReference: React.MutableRefObject<InfinitePagerImperativeApi | null>;
	renderPageComponent: () => JSX.Element;
};

const InfinitePager = ({
	infinitePagerReference,
	renderPageComponent,
}: Properties): JSX.Element => {
	return (
		<RNInfinitePager
			animationConfig={ANIMATION_CONFIG}
			gesturesDisabled
			pageBuffer={PREVIOUS_INDEX_OFFSET}
			PageComponent={renderPageComponent}
			pageInterpolator={getPageInterpolatorSlide}
			ref={infinitePagerReference}
		/>
	);
};

export { InfinitePager };
