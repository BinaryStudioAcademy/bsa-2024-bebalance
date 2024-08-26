import { Platform } from "react-native";

const checkIfAndroid = (): boolean => Platform.OS === "android";
const checkIfIos = (): boolean => Platform.OS === "ios";

export { checkIfAndroid, checkIfIos };
