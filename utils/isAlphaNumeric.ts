const isAlphaNumeric = (string: string): Boolean => {
	const regex = new RegExp(/^[a-z0-9]+$/i);
	return regex.test(string);
};

export default isAlphaNumeric;
