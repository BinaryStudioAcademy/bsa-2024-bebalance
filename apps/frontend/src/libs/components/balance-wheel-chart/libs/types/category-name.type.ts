import { type CATEGORIES_ORDER } from "../constants/constants.js";

type CategoryName = (typeof CATEGORIES_ORDER)[number];

export { type CategoryName };
