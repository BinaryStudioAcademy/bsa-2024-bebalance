import { Icon, Link } from "~/libs/components/components.js";
import { type AppRoute } from "~/libs/enums/enums.js";
import { type IconName, type ValueOf } from "~/libs/types/types.js";

type Properties = {
	iconName: IconName;
	label: string;
	pathname: string;
	to: ValueOf<typeof AppRoute>;
};

const SidebarLink: React.FC<Properties> = ({
	iconName,
	label,
	pathname,
	to,
}: Properties) => {
	const isActive = pathname === to;

	return (
		<Link isActive={isActive} to={to} type="navLink">
			<Icon name={iconName} />
			{label}
		</Link>
	);
};

export { SidebarLink };
