import { TopEmoji, Url } from "../types";

import emojiStringToArray from "./emojiStringToArray";
import isEmoji from "./isEmoji";

const getTopEmojis = (urlData: Url[]): TopEmoji => {
	return urlData?.reduce((acc, { teeny_code: teenyCode, hits }) => {
		const teenyCodeCharacters = emojiStringToArray(teenyCode);

		teenyCodeCharacters.forEach((character) => {
			if (!isEmoji(character)) return;

			if (!acc[character]) {
				acc[character] = hits;
			} else {
				acc[character] += hits;
			}
		});

		return acc;
	}, {} as TopEmoji);
};

export default getTopEmojis;
