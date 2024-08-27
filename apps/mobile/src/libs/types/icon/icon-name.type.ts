import { type ComponentPropsWithoutRef } from "react";

import { type MaterialIcon } from "~/libs/components/components";

type IconName = ComponentPropsWithoutRef<typeof MaterialIcon>["name"];

export { type IconName };
