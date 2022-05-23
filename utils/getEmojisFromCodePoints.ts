const getEmojisFromCodePoints = (codePointsString: string): string => {
	return String.fromCodePoint(...codePointsString.split(" ").map((n) => Number(n)));
};

export default getEmojisFromCodePoints;
