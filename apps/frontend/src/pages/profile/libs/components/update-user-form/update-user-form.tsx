import runImg from "~/assets/img/run.svg";
import { Button, Input, Popup } from "~/libs/components/components.js";
import { useAppForm, useBlocker, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserDto,
	type UserUpdateFormDto,
	type UserUpdateRequestDto,
	userUpdateValidationSchema,
} from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: UserUpdateRequestDto) => void;
	user: UserDto;
};

const UpdateUserForm: React.FC<Properties> = ({
	onSubmit,
	user,
}: Properties) => {
	const { email, name } = user;
	const { control, errors, handleSubmit, isDirty, reset } =
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

	const blocker = useBlocker(isDirty);

	const handleCancelPopupClick = useCallback((): void => {
		if (blocker.state === "blocked") {
			blocker.reset();
		}
	}, [blocker]);

	const handleConfirmPopupClick = useCallback((): void => {
		reset();

		if (blocker.state === "blocked") {
			blocker.proceed();
		}
	}, [blocker, reset]);

	return (
		<>
			<Popup
				closeButtonLabel="CANCEL"
				confirmButtonLabel="YES"
				hasCloseIcon
				icon={runImg}
				isOpen={isDirty && blocker.state === "blocked"}
				onClose={handleCancelPopupClick}
				onConfirm={handleConfirmPopupClick}
				title="Unsaved changes will be lost. Continue?"
			/>
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
		</>
	);
};

export { UpdateUserForm };
