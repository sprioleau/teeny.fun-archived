import GraphemeSplitter from "grapheme-splitter";

const emojiStringToArray = (emojiString: string): string[] => {
	const splitter = new GraphemeSplitter();
	return splitter.splitGraphemes(emojiString);
};

export default emojiStringToArray;
