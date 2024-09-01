import React from "react";
import { useLocation } from "react-router-dom";

function useQuery(): URLSearchParams {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

export { useQuery };
