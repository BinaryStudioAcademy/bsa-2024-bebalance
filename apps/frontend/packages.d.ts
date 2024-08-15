declare module "eslint-plugin-react" {
	import { type Linter } from "eslint";

	const configs: Record<
		"jsx-runtime" | "recommended",
		Required<Linter.FlatConfig>
	>;

	export default {
		configs,
	};
}

declare module "eslint-plugin-react-hooks" {
	import { type Linter } from "eslint";

	const configs: Record<"recommended", Required<Linter.FlatConfig>>;

	export default {
		configs,
	};
}

declare module "eslint-plugin-jsx-a11y" {
	import { type Linter } from "eslint";

	const configs: Record<"recommended", Required<Linter.FlatConfig>>;

	export default {
		configs,
	};
}
