import validUrl from "valid-url";

const isValidUrl = (url: string) => {
	return validUrl.isUri(url) && url.replace(/https?:\/\//gi, "").length > 0;
};

export default isValidUrl;
