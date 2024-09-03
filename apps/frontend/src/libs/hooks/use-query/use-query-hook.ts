import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { type QueryParameters } from "~/libs/types/types.js";

function useQuery(): QueryParameters {
	const { search } = useLocation();

	const queryParametersList: QueryParameters = {};

	const queryParameters = useMemo(() => new URLSearchParams(search), [search]);

	for (const [key, value] of queryParameters.entries()) {
		queryParametersList[key] = value;
	}

	return queryParametersList;
}

export { useQuery };
