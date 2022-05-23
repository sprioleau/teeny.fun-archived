import { isDevelopment } from "../constants";

const log = (arg: any): void => {
	if (!isDevelopment) return;
	console.log({ arg });
};

export default log;
