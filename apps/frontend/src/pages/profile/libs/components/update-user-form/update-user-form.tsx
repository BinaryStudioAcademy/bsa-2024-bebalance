import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserDto,
	type UserUpdateRequestDto,
	userUpdateValidationSchema,
} from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	onCancel: () => void;
	onSubmit: (payload: UserUpdateRequestDto) => void;
	user?: UserDto;
};

const UpdateUserForm: React.FC<Properties> = ({
	onCancel,
	onSubmit,
	user,
}: Properties) => {
	const { control, errors, handleSubmit } = useAppForm<UserUpdateRequestDto>({
		defaultValues: { name: user?.name ?? "" },
		validationSchema: userUpdateValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<form className={styles["form"]} onSubmit={handleFormSubmit}>
			<Input
				control={control}
				errors={errors}
				label="Name"
				name="name"
				placeholder="name"
				type="text"
			/>
			<div className={styles["buttons-container"]}>
				<Button
					isPrimary={false}
					label="CANCEL"
					onClick={onCancel}
					type="button"
				/>
				<Button label="SAVE" type="submit" />
			</div>
		</form>
	);
};

export { UpdateUserForm };
