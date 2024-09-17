import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button } from "~/libs/components/components.js";
import { ZERO_INDEX } from "~/libs/constants/constants.js";
import { ContentType } from "~/libs/enums/enums.js";
import { useCallback, useRef } from "~/libs/hooks/hooks.js";
import { type UserDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	onSubmit: (data: FormData) => void;
	user: UserDto;
};

const UpdateAvatarForm: React.FC<Properties> = ({
	onSubmit,
	user,
}: Properties) => {
	const fileInputReference = useRef<HTMLInputElement | null>(null);

	const handleFormChange: React.FormEventHandler = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			event.preventDefault();

			if (event.target.files?.length) {
				const formData = new FormData();
				formData.append("file", event.target.files.item(ZERO_INDEX) as File);
				onSubmit(formData);
			}
		},
		[onSubmit],
	);

	const handleButtonClick = useCallback(() => {
		fileInputReference.current?.click();
	}, [fileInputReference]);

	return (
		<form className={styles["form"]} onChange={handleFormChange}>
			<img
				alt={`${user.name}'s avatar`}
				className={styles["user-avatar"]}
				src={user.avatarUrl ?? defaultAvatar}
			/>
			<input
				accept={[ContentType.JPEG, ContentType.PNG].join(", ")}
				hidden
				name="upload-avatar"
				ref={fileInputReference}
				type="file"
			/>
			<Button label="UPLOAD AVATAR" onClick={handleButtonClick} />
		</form>
	);
};

export { UpdateAvatarForm };
