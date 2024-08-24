import { Platform } from "~/libs/components/components";

const isAndroid = (): boolean => Platform.OS === "android";
const isIos = (): boolean => Platform.OS === "ios";

export { isAndroid, isIos };
