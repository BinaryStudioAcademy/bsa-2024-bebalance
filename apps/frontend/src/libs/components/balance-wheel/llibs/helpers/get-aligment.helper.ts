const getAlignment = (
	x: number,
	chartArea: { left: number; right: number },
): "center" | "left" | "right" => {
	if (x < chartArea.left) {
		return "right";
	} else if (x > chartArea.right) {
		return "left";
	}

	return "center";
};

export { getAlignment };
