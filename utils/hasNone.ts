const hasNone = (array: any[] = []): Boolean => {
	// If not an array, return true
	if (!Array.isArray(array)) return true;
	return array.length === 0;
};

export default hasNone;
