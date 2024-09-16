import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCallback } from "~/libs/hooks/hooks.js";

import { NotificationIcon } from "./libs/components/components.js";
import { type IconProperties } from "./libs/types/types.js";

const Notification: React.FC = () => {
	const handleRenderIcon = useCallback((context: IconProperties) => {
		const { type } = context;

		if (type === "default") {
			return null;
		}

		return <NotificationIcon notificationType={type} />;
	}, []);

	return <ToastContainer hideProgressBar icon={handleRenderIcon} />;
};

export { Notification };
