// Reference: https://stackoverflow.com/questions/56504602/check-if-string-contains-only-emojis-javascript

import emojiRegex from "emoji-regex";

const isEmoji = (string: string) => {
	// prettier-ignore
	const regex = emojiRegex();
	return regex.test(String(string));
};

export default isEmoji;
