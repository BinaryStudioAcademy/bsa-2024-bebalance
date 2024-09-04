import { type Chart, type RadialLinearScale } from "~/libs/types/types.js";

import { FIRST_ELEMENT_INDEX } from "../constants/constants.js";
import { type PolarAreaType } from "../types/types.js";
import { getLabelOffset } from "./helpers.js";

const updateLabels = (chart: Chart<PolarAreaType>): void => {
	const meta = chart.getDatasetMeta(FIRST_ELEMENT_INDEX);
	const { chartArea } = chart;

	const { _pointLabelItems: pointLabelItems } = meta.rScale as {
		_pointLabelItems: { textAlign: string; x: number; y: number }[];
	} & RadialLinearScale;

	for (const label of pointLabelItems) {
		label.textAlign = "center";

		const { x: horizontalPositionLabel, y: verticalPositionLabel } = label;

		const { offsetX: xOffSet, offsetY: yOffSet } = getLabelOffset(
			{ x: horizontalPositionLabel, y: verticalPositionLabel },
			chartArea,
		);

		label.x = horizontalPositionLabel + xOffSet;
		label.y = verticalPositionLabel + yOffSet;
	}
};

export { updateLabels };
