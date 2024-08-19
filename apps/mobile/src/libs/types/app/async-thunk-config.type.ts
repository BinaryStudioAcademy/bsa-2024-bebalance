import { type store } from "~/libs/packages/store/store";

type AsyncThunkConfig = {
	dispatch: typeof store.instance.dispatch;
	extra: typeof store.extraArguments;
	state: ReturnType<typeof store.instance.getState>;
};

export { type AsyncThunkConfig };
