import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback, useEffect } from "~/libs/hooks/hooks.js";
import {
	type UserDto,
	type UserUpdateFormDto,
	type UserUpdateRequestDto,
	userUpdateValidationSchema,
} from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: UserUpdateRequestDto) => void;
	setIsDirty: (payload: boolean) => void;
	user: UserDto;
};

const UpdateUserForm: React.FC<Properties> = ({
	onSubmit,
	setIsDirty,
	user,
}: Properties) => {
	const { email, name } = user;
	const { control, errors, handleSubmit, isDirty } =
		useAppForm<UserUpdateFormDto>({
			defaultValues: { email, name },
			validationSchema: userUpdateValidationSchema,
		});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	useEffect(() => {
		setIsDirty(isDirty);
	}, [isDirty, setIsDirty]);

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
			<Input
				control={control}
				errors={errors}
				isDisabled
				label="Email"
				name="email"
				placeholder="email"
				type="email"
			/>
			<Button label="SAVE" type="submit" />
		</form>
	);
};

export { UpdateUserForm };
