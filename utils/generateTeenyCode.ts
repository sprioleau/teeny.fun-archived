import pickRandomElement from "./pickRandomElement";

const generateTeenyCode = (emojisList: string[], desiredLength: number = 4): string => {
	let randomEmojiString = "";

	for (let i = 0; i < desiredLength; i++) {
		randomEmojiString += pickRandomElement(emojisList);
	}

	return randomEmojiString;
};

export default generateTeenyCode;
