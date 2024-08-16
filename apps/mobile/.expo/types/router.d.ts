/* eslint-disable */
import * as Router from "expo-router";

export * from "expo-router";

declare module "expo-router" {
	export namespace ExpoRouter {
		export interface __routes<T extends string = string>
			extends Record<string, unknown> {
			StaticRoutes:
				| `/`
				| `/(auth)`
				| `/(auth)/sign-up`
				| `/(tabs)`
				| `/(tabs)/home`
				| `/_sitemap`
				| `/home`
				| `/sign-up`;
			DynamicRoutes: never;
			DynamicRouteTemplate: never;
		}
	}
}
