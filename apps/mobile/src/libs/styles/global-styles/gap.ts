import { Spacing } from "./spacing";

const Gap = {
	gap2: { gap: Spacing.xxxs },
	gap4: { gap: Spacing.xxs },
	gap8: { gap: Spacing.xs },
	gap12: { gap: Spacing.sm },
	gap16: { gap: Spacing.md },
	gap24: { gap: Spacing.lg },
	gap32: { gap: Spacing.xl },
	gap48: { gap: Spacing.xxl },
} as const;

export { Gap };
