import { type ValueOf } from "~/libs/types/types.js";

import { type ChatMessageType } from "../enums/enums.js";
import { type SelectedCategories, type TaskCreateDto } from "./types.js";

type Message = {
	buttonLabels?: string[];
	lowestCategories?: SelectedCategories[];
	message: string;
	tasks?: TaskCreateDto[];
	threadId?: string;
	type: ValueOf<typeof ChatMessageType>;
};

export { type Message };
