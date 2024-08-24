import { Icon, Link } from "~/libs/components/components.js";
import { type AppRoute } from "~/libs/enums/enums.js";
import { type IconName, type ValueOf } from "~/libs/types/types.js";

type Properties = {
	icon: IconName;
	pathname: string;
	title: string;
	to: ValueOf<typeof AppRoute>;
};

const SidebarLink: React.FC<Properties> = ({
	icon,
	pathname,
	title,
	to,
}: Properties) => {
	const isActive = pathname === to;
	return (
		<Link isActive={isActive} to={to} type="navLink">
			<Icon name={icon} />
			{title}
		</Link>
	);
};

export { SidebarLink };
