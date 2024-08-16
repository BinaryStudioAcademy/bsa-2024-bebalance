import { useSafeAreaInsets, type Edge } from 'react-native-safe-area-context';
import type { FlexStyle } from 'react-native';

type ExtendedEdge = Edge | 'start' | 'end';

const propertySuffixMap = {
	top: 'Top',
	bottom: 'Bottom',
	left: 'Start',
	right: 'End',
	start: 'Start',
	end: 'End',
};

const edgeInsetMap: Record<'start' | 'end', Edge> = {
	start: 'left',
	end: 'right',
};

type UseSafeAreaInsetsStyle = Pick<
	FlexStyle,
	| 'marginBottom'
	| 'marginEnd'
	| 'marginStart'
	| 'marginTop'
	| 'paddingBottom'
	| 'paddingEnd'
	| 'paddingStart'
	| 'paddingTop'
>;

function useSafeAreaInsetsStyle(
	safeAreaEdges: ExtendedEdge[] = [],
	property: 'padding' | 'margin' = 'padding'
): UseSafeAreaInsetsStyle {
	const insets = useSafeAreaInsets();

	return safeAreaEdges.reduce<UseSafeAreaInsetsStyle>((acc, e) => {
		let value: Edge;

		if (e === 'start' || e === 'end') {
			value = edgeInsetMap[e];
		} else {
			value = e;
		}

		return { ...acc, [`${property}${propertySuffixMap[e]}`]: insets[value] };
	}, {});
}

export { useSafeAreaInsetsStyle };
