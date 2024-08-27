import { ComponentPropsWithoutRef } from "react";

import { MaterialIcon } from "~/libs/components/components";

type IconName = ComponentPropsWithoutRef<typeof MaterialIcon>["name"];

export { type IconName };
