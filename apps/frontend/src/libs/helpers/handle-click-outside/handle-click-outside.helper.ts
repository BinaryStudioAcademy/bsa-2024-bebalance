import { useEffect, useRef } from "~/libs/hooks/hooks.js";

const handleClickOutside = <T extends HTMLElement>(
	callback: () => void,
): React.MutableRefObject<null | T> => {
	const reference = useRef<null | T>(null);

	useEffect(() => {
		const detectClickOutside = (event: MouseEvent | TouchEvent): void => {
			if (
				reference.current &&
				!reference.current.contains(event.target as Node)
			) {
				callback();
			}
		};

		document.addEventListener("mousedown", detectClickOutside);
		document.addEventListener("touchstart", detectClickOutside);

		return (): void => {
			document.removeEventListener("mousedown", detectClickOutside);
			document.removeEventListener("touchstart", detectClickOutside);
		};
	}, [callback]);

	return reference;
};

export { handleClickOutside };
