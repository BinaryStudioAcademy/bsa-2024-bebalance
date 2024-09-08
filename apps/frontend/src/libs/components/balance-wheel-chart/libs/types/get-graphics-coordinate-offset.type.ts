import { type CentersCoordinates, type GraphicsPosition } from "./types.js";

type GetGraphicsCoordinateOffset = (
	graphicsPosition: GraphicsPosition,
	centers: CentersCoordinates,
) => number;

export { type GetGraphicsCoordinateOffset };
