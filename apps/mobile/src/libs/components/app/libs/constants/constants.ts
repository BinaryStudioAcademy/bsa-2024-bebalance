import { config } from "~/libs/packages/config/config";

const { HOST, SCHEME } = config.ENV.API;

const DEEP_LINK_PREFIX = `${SCHEME}://${HOST}`;

export { DEEP_LINK_PREFIX };
