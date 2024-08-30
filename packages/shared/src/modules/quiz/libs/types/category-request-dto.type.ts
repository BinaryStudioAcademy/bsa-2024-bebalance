import { type CategoryDto } from "./types.js";

type CategoryRequestDto = Omit<
	CategoryDto,
	"createdAt" | "id" | "scores" | "updatedAt"
>;

export { type CategoryRequestDto };
