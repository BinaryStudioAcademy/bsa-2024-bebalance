import { type UserPreferencesPayloadDto } from "./user-preferences-payload-dto.type.js";

type UserPreferencesRequestDto = {
	userId: number;
} & UserPreferencesPayloadDto;

export { type UserPreferencesRequestDto };
