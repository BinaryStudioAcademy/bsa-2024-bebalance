import { AuthApiPath } from "~/modules/auth/auth.js";
import { QuizApiPath } from "~/modules/quiz/quiz.js";

import { APIPath } from "../enums/enums.js";

const WHITE_ROUTES: string[] = [
	"/documentation",
	APIPath.AUTH,
	`${APIPath.AUTH}${AuthApiPath.SIGN_IN}`,
	`${APIPath.AUTH}${AuthApiPath.SIGN_UP}`,
	`${APIPath.QUIZ}${QuizApiPath.QUESTIONS}`,
];

export { WHITE_ROUTES };
