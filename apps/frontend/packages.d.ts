declare module "eslint-plugin-react" {
	import { type Linter } from "eslint";

	const configs: Record<"jsx-runtime" | "recommended", Required<Linter.Config>>;

	export { configs };
}

declare module "eslint-plugin-react-hooks" {
	import { type Linter } from "eslint";

	const configs: Record<"recommended", Required<Linter.Config>>;

	export { configs };
}

declare module "eslint-plugin-jsx-a11y" {
	import { type Linter } from "eslint";

	const configs: Record<"recommended", Required<Linter.Config>>;

	export { configs };
}
