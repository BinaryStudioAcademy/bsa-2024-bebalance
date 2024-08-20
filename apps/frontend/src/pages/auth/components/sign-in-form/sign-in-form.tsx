import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignInRequestDto,
	userSignInValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_IN_PAYLOAD } from "./libs/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
		defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
		validationSchema: userSignInValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<div className={styles["sign-in__container"]}>
			<div className={styles["sign-in__form-container"]}>
				<form className={styles["sign-in__form"]} onSubmit={handleFormSubmit}>
					<div className={styles["sign-in__form-header"]}>
						<div className={styles["sign-in__form-header-logo-container"]}>
							<div className={styles["sign-in__form-header-logo"]} />
							<span className={styles["sign-in__form-header-logo-text"]}>
								LOGO
							</span>
						</div>

						<h1 className={styles["sign-in__form-header-text"]}>SIGN IN</h1>
						<span className={styles["sign-in__form-header-sub-text"]}>
							No account? Go to{" "}
							<Link
								className={styles["sign-in__form-link"]}
								to={AppRoute.SIGN_UP}
							>
								Create an Account
							</Link>
						</span>
					</div>

					<Input
						control={control}
						errors={errors}
						label="Email"
						name="email"
						placeholder="name@gmail.com"
						type="email"
					/>

					<Input
						control={control}
						errors={errors}
						label="Password"
						name="password"
						placeholder="*******"
						type="text"
					/>

					<Button label="SIGN IN" type="submit" />

					<Link className={styles["sign-in__form-link"]} to={"/sign-in"}>
						Forgot password?
					</Link>
				</form>
			</div>

			<div className={styles["sign-in__logo-container"]}>
				<span className={styles["sign-in__logo"]}>LOGO</span>
			</div>

			<svg
				className={styles["svg-background1"]}
				fill="none"
				viewBox="0 0 529 315"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g style={{ mixBlendMode: "color-dodge", opacity: 0.3 }}>
					<g style={{ mixBlendMode: "multiply" }}>
						<path
							d="M264.935 312.673C409.451 312.673 526.604 195.742 526.604 51.5C526.604 -92.7421 409.451 -209.673 264.935 -209.673C120.419 -209.673 3.26611 -92.7421 3.26611 51.5C3.26611 195.742 120.419 312.673 264.935 312.673Z"
							stroke="white"
							strokeMiterlimit="10"
							strokeWidth="0.840214"
						/>
						<path
							d="M264.86 290.423C397.065 290.423 504.237 183.454 504.237 51.4999C504.237 -80.4539 397.065 -187.424 264.86 -187.424C132.656 -187.424 25.4834 -80.4539 25.4834 51.4999C25.4834 183.454 132.656 290.423 264.86 290.423Z"
							stroke="white"
							strokeMiterlimit="10"
							strokeWidth="0.840214"
						/>
						<path
							d="M264.786 268.174C384.678 268.174 481.871 171.166 481.871 51.5C481.871 -68.1657 384.678 -165.174 264.786 -165.174C144.893 -165.174 47.7007 -68.1657 47.7007 51.5C47.7007 171.166 144.893 268.174 264.786 268.174Z"
							stroke="white"
							strokeMiterlimit="10"
							strokeWidth="0.840214"
						/>
						<path
							d="M264.71 245.924C372.292 245.924 459.503 158.877 459.503 51.5C459.503 -55.8775 372.292 -142.924 264.71 -142.924C157.129 -142.924 69.9175 -55.8775 69.9175 51.5C69.9175 158.877 157.129 245.924 264.71 245.924Z"
							stroke="white"
							strokeMiterlimit="10"
							strokeWidth="0.840214"
						/>
						<path
							d="M264.636 223.674C359.905 223.674 437.137 146.589 437.137 51.4999C437.137 -43.5893 359.905 -120.674 264.636 -120.674C169.366 -120.674 92.1348 -43.5893 92.1348 51.4999C92.1348 146.589 169.366 223.674 264.636 223.674Z"
							stroke="white"
							strokeMiterlimit="10"
							strokeWidth="0.840214"
						/>
						<path
							d="M264.561 201.424C347.519 201.424 414.77 134.301 414.77 51.5C414.77 -31.3011 347.519 -98.4246 264.561 -98.4246C181.603 -98.4246 114.352 -31.3011 114.352 51.5C114.352 134.301 181.603 201.424 264.561 201.424Z"
							stroke="white"
							strokeMiterlimit="10"
							strokeWidth="0.840214"
						/>
						<path
							d="M264.486 179.175C335.133 179.175 392.403 122.013 392.403 51.5C392.403 -19.0129 335.133 -76.1748 264.486 -76.1748C193.84 -76.1748 136.569 -19.0129 136.569 51.5C136.569 122.013 193.84 179.175 264.486 179.175Z"
							stroke="white"
							strokeMiterlimit="10"
							strokeWidth="0.840214"
						/>
						<path
							d="M264.486 156.925C322.822 156.925 370.111 109.725 370.111 51.5C370.111 -6.72467 322.822 -53.925 264.486 -53.925C206.151 -53.925 158.861 -6.72467 158.861 51.5C158.861 109.725 206.151 156.925 264.486 156.925Z"
							stroke="white"
							strokeMiterlimit="10"
							strokeWidth="0.840214"
						/>
						<path
							d="M264.412 134.675C310.435 134.675 347.745 97.4364 347.745 51.5C347.745 5.56353 310.435 -31.6753 264.412 -31.6753C218.388 -31.6753 181.079 5.56353 181.079 51.5C181.079 97.4364 218.388 134.675 264.412 134.675Z"
							stroke="white"
							strokeMiterlimit="10"
							strokeWidth="0.840214"
						/>
						<path
							d="M264.337 112.425C298.049 112.425 325.378 85.1482 325.378 51.5C325.378 17.8517 298.049 -9.42554 264.337 -9.42554C230.625 -9.42554 203.296 17.8517 203.296 51.5C203.296 85.1482 230.625 112.425 264.337 112.425Z"
							stroke="white"
							strokeMiterlimit="10"
							strokeWidth="0.840214"
						/>
						<path
							d="M264.261 90.1757C285.662 90.1757 303.01 72.86 303.01 51.5C303.01 30.1399 285.662 12.8242 264.261 12.8242C242.861 12.8242 225.512 30.1399 225.512 51.5C225.512 72.86 242.861 90.1757 264.261 90.1757Z"
							stroke="white"
							strokeMiterlimit="10"
							strokeWidth="0.840214"
						/>
						<path
							d="M264.187 67.926C273.276 67.926 280.644 60.5718 280.644 51.5C280.644 42.4281 273.276 35.074 264.187 35.074C255.098 35.074 247.73 42.4281 247.73 51.5C247.73 60.5718 255.098 67.926 264.187 67.926Z"
							stroke="white"
							strokeMiterlimit="10"
							strokeWidth="0.840214"
						/>
					</g>
				</g>
			</svg>

			<svg
				className={styles["svg-background2"]}
				fill="none"
				viewBox="0 0 833 740"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g style={{ mixBlendMode: "color-dodge", opacity: 0.3 }}>
					<g
						stroke="#fff"
						strokeMiterlimit="10"
						strokeWidth=".84"
						style={{ mixBlendMode: "multiply" }}
					>
						<path d="M473.36 939.169c258.651 0 468.328-209.233 468.328-467.336S732.011 4.496 473.36 4.496 5.033 213.73 5.033 471.833 214.71 939.169 473.36 939.169Z" />
						<path d="M473.227 899.356c236.615 0 428.43-191.409 428.43-427.523S709.842 44.309 473.227 44.309c-236.616 0-428.43 191.409-428.43 427.524 0 236.114 191.814 427.523 428.43 427.523Z" />
						<path d="M473.093 859.543c214.581 0 388.532-173.584 388.532-387.711 0-214.126-173.951-387.71-388.532-387.71S84.56 257.706 84.56 471.832c0 214.127 173.952 387.711 388.533 387.711Z" />
						<path d="M472.959 819.73c192.546 0 348.635-155.759 348.635-347.897 0-192.139-156.089-347.897-348.635-347.897S124.324 279.694 124.324 471.833 280.413 819.73 472.959 819.73Z" />
						<path d="M472.825 779.917c170.511 0 308.738-137.934 308.738-308.084 0-170.151-138.227-308.084-308.738-308.084S164.087 301.682 164.087 471.833c0 170.15 138.227 308.084 308.738 308.084Z" />
						<path d="M472.691 740.104c148.476 0 268.84-120.109 268.84-268.271s-120.364-268.271-268.84-268.271-268.84 120.109-268.84 268.271 120.364 268.271 268.84 268.271Z" />
						<path d="M472.557 700.291c126.442 0 228.943-102.284 228.943-228.458S598.999 243.375 472.557 243.375c-126.441 0-228.942 102.284-228.942 228.458s102.501 228.458 228.942 228.458Z" />
						<path d="M472.558 660.478c104.406 0 189.044-84.46 189.044-188.645s-84.638-188.645-189.044-188.645-189.045 84.459-189.045 188.645c0 104.185 84.638 188.645 189.045 188.645Z" />
						<path d="M472.424 620.664c82.371 0 149.147-66.634 149.147-148.831 0-82.198-66.776-148.832-149.147-148.832-82.372 0-149.148 66.634-149.148 148.832s66.776 148.831 149.148 148.831Z" />
						<path d="M472.29 580.851c60.337 0 109.249-48.809 109.249-109.018S532.627 362.814 472.29 362.814s-109.25 48.81-109.25 109.019 48.913 109.018 109.25 109.018Z" />
						<path d="M472.154 541.038c38.303 0 69.353-30.984 69.353-69.205s-31.05-69.206-69.353-69.206-69.352 30.985-69.352 69.206 31.05 69.205 69.352 69.205Z" />
						<path d="M472.022 501.225c16.267 0 29.455-13.159 29.455-29.392s-13.188-29.393-29.455-29.393-29.455 13.16-29.455 29.393 13.188 29.392 29.455 29.392Z" />
					</g>
				</g>
			</svg>

			<div className={styles["circle-gradiant1"]} />
			<div className={styles["circle-gradiant2"]} />
			<div className={styles["circle-gradiant3"]} />
		</div>
	);
};

export { SignInForm };
