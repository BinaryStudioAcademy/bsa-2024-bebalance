import { Button } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useCallback, useNavigate } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const Analyzing: React.FC = () => {
	const navigate = useNavigate();

	const handleQuizPart = useCallback((): void => {
		navigate(AppRoute.QUIZ);
	}, [navigate]);

	return (
		<div className={styles["page-container"]}>
			<div className={styles["border-container"]}>
				<div className={styles["content-container"]}>
					<h1 className={styles["title"]}>We’re Analyzing Your Journey!</h1>
					<div className={styles["text"]}>
						<p>
							Thank you for sharing your insights! We’re currently processing
							your responses to create a personalized path just for you. This is
							where the magic begins—we’re using your input to tailor the
							experience, offering you the guidance and motivation you need to
							achieve a balanced, fulfilling life.
						</p>
						<p>
							Hang tight while we set things up! In just a moment, you’ll dive
							into the areas that matter most to you, and together, we’ll start
							making progress toward your goals. Your journey to a better life
							starts now!
						</p>
					</div>
					<Button
						label="Let’s continue"
						onClick={handleQuizPart}
						type="button"
					/>
				</div>
			</div>
		</div>
	);
};

export { Analyzing };
