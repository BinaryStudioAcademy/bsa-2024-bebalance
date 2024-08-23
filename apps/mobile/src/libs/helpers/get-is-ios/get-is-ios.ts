import { Platform } from "~/libs/components/components";

const getIsIos = () => Platform.OS === "ios";
export { getIsIos };
