import { type TypeOptions } from "react-toastify";

type NotificationIconType = Exclude<TypeOptions, "default">;

export { type IconProps as IconProperties } from "react-toastify";
export { type NotificationIconType };
