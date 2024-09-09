import { useCallback } from "~/libs/hooks/hooks.js";

import { Button, Slider } from "../components.js";
import { type ModalData } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	data: ModalData[];
	setClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const ScoresEditModal: React.FC<Properties> = ({
	data,
	setClose,
}: Properties) => {
	const handleClose = useCallback(() => {
		// TODO: Save changes
		setClose(false);
	}, [setClose]);

	return (
		<div className={styles["container"]}>
			<p className={styles["text"]}>
				Do you feel any changes in anything? Estimate the fields from 1 to 10
			</p>
			<div className={styles["scores-container"]}>
				{data.map((item) => (
					<Slider
						key={item.categoryId}
						label={item.categoryName}
						value={item.score}
					/>
				))}
			</div>
			<Button label="Save changes" onClick={handleClose} />
		</div>
	);
};

export { ScoresEditModal };
