import { BalanceWheel } from "~/libs/components/components.js";
import { useAppDispatch, useEffect } from "~/libs/hooks/hooks.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

const randomData = [
	{ data: 10, label: "10" },
	{ data: 9, label: "9" },
	{ data: 8, label: "8" },
	{ data: 6, label: "6" },
	{ data: 5, label: "5" },
	{ data: 4, label: "4" },
	{ data: 3, label: "3" },
	{ data: 1, label: "1" },
];

const UserWheel: React.FC = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		void dispatch(quizActions.getScores());
	}, [dispatch]);

	return (
		<>
			<BalanceWheel data={randomData} />
		</>
	);
};

export { UserWheel };
