import { useEffect } from "~/libs/hooks/hooks.js";

const useClickOutside = <T extends HTMLElement>(
	onClickOutside: () => void,
	reference: React.MutableRefObject<null | T>,
): React.MutableRefObject<null | T> => {
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
	}, [onClickOutside, reference]);

	return reference;
};

export { useClickOutside };
