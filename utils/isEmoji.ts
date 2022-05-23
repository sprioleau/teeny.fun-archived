// Reference: https://stackoverflow.com/questions/56504602/check-if-string-contains-only-emojis-javascript

import emojiRegex from "emoji-regex";

const isEmoji = (emojis: string | string[]) => {
	const regex = emojiRegex();
	const testIsEmoji = (string: string) => regex.test(String(string));

	// For strings
	if (typeof emojis === "string") return testIsEmoji(emojis);

	// For arrays
	if (!Array.isArray(emojis)) return false;
	return emojis.every((emoji) => regex.test(String(emoji)));
};

export default isEmoji;
