import { useEffect, useRef } from "~/libs/hooks/hooks.js";

const handleClickOutside = <T extends HTMLElement>(
	onClickOutside: () => void,
): React.MutableRefObject<null | T> => {
	const reference = useRef<null | T>(null);

	useEffect(() => {
		const handleDetectClickOutside = (event: MouseEvent | TouchEvent): void => {
			if (
				reference.current &&
				!reference.current.contains(event.target as Node)
			) {
				onClickOutside();
			}
		};

		document.addEventListener("mousedown", handleDetectClickOutside);
		document.addEventListener("touchstart", handleDetectClickOutside);

		return (): void => {
			document.removeEventListener("mousedown", handleDetectClickOutside);
			document.removeEventListener("touchstart", handleDetectClickOutside);
		};
	}, [onClickOutside]);

	return reference;
};

export { handleClickOutside };
