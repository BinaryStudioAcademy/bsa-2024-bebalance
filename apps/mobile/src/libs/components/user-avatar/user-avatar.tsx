import React from "react";

import { Icon, Image } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import { type UserDto } from "~/packages/users/users";

type Properties = {
	size?: number;
	user: null | UserDto;
};

const DEFAULT_SIZE = 34;

const UserAvatar: React.FC<Properties> = ({ size = DEFAULT_SIZE, user }) => {
	const avatarStyle: Image["props"]["style"] = [
		{
			borderRadius: size,
			height: size,
			width: size,
		},
	];

	return (
		<>
			{user?.avatarUrl ? (
				<Image
					resizeMode="contain"
					source={{ uri: user.avatarUrl }}
					style={avatarStyle}
				/>
			) : (
				<Icon color={BaseColor.LIGHT_GRAY} name="account-circle" size={size} />
			)}
		</>
	);
};

export { UserAvatar };
