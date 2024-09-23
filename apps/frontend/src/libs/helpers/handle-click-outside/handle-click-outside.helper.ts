import { useEffect, useRef } from "~/libs/hooks/hooks.js";

const handleClickOutside = <T extends HTMLElement>(
	callback: () => void,
): React.MutableRefObject<null | T> => {
	const reference = useRef<null | T>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
			if (
				reference.current &&
				!reference.current.contains(event.target as Node)
			) {
				callback();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);

		return (): void => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [callback]);

	return reference;
};

export { handleClickOutside };
