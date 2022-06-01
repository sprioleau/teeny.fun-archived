import { STRINGS } from "@constants";
import { Url } from "@types";

const saveToLocalStorage = (key = STRINGS.TEENY_URLS, urlData: Url): void => {
	const existingUrls = JSON.parse(localStorage.getItem(key) ?? "[]");
	localStorage.setItem(key, JSON.stringify([urlData, ...existingUrls]));
};

export default saveToLocalStorage;
