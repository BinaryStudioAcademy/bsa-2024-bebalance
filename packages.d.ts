declare module "eslint-plugin-perfectionist" {
	import { type Linter } from "eslint";

	const configs: Record<
		"configs",
		Record<"recommended-natural", Required<Linter.FlatConfig>>
	>;

	export default configs;
}

declare module "eslint-plugin-unicorn" {
	import { type Linter } from "eslint";

	const configs: Record<
		"configs",
		Record<"recommended", Required<Linter.FlatConfig>>
	>;

	export default configs;
}

declare module "eslint-plugin-import" {
	import { type Linter } from "eslint";

	const configs: Record<
		"configs",
		Record<"recommended", Required<Linter.FlatConfig>>
	>;

	export default configs;
}

declare module "eslint-plugin-sonarjs" {
	import { type Linter } from "eslint";

	const configs: Record<"recommended", Required<Linter.FlatConfig>>;

	export default {
		configs,
	};
}

declare module "@typescript-eslint/eslint-plugin" {
	import { type Linter } from "eslint";

	const configs: Record<"strict-type-checked", Required<Linter.FlatConfig>>;

	export default {
		configs,
	};
}
