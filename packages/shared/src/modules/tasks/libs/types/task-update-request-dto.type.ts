import { type ValueOf } from "../../../../libs/types/types.js";
import { type TaskStatus } from "../enums/enums.js";

type TaskUpdateRequestDto = {
	description: string;
	label: string;
	status: ValueOf<typeof TaskStatus>;
};

export { type TaskUpdateRequestDto };
