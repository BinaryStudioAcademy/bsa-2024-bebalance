import React from "react";
import Toast from "react-native-toast-message";

import { toastConfig } from "~/libs/packages/toast-message/toast-message";

const ToastMessage: React.FC = () => {
	return <Toast config={toastConfig} />;
};

export { ToastMessage };
