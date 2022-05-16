const removeTrailingSlash = (url: string) => {
	return url.charAt(url.length - 1) === "/" ? url.slice(0, url.length - 1) : url;
};

export default removeTrailingSlash;
