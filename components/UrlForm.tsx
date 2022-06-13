import { isValidUrl, log, removeTrailingSlash } from "@utils";

import { GrMagic } from "react-icons/gr";
import { HiLink } from "react-icons/hi";
import React from "react";

const UrlForm = () => {
	const [longUrl, setLongUrl] = React.useState<string>("");
	const [teenyCode, setTeenyCode] = React.useState<string>("");

	const isSet = (values: string | string[]) => {
		if (Array.isArray(values)) return values.every((value: string) => value.length > 0);
		return values.length > 0;
	};

	const handleUpdateLongUrl = (e: React.ChangeEvent<HTMLInputElement>) => setLongUrl(e.target.value);
	const handleUpdateTeenyCode = (e: React.ChangeEvent<HTMLInputElement>) => setTeenyCode(e.target.value);

	const handleCreateTeenyLink = async () => {
		if (!isSet(longUrl)) return alert("Required fields not set");
		if (!isValidUrl(longUrl)) return alert("Not a valid URL");

		const queryString = new URLSearchParams({
			long_url: String(removeTrailingSlash(longUrl)),
		});

		const response = await fetch(`/api/createTeenyUrl?${queryString}`);
		const { data, error } = await response.json();

		if (!error) {
			setLongUrl("");
		}

		log({ data, error });
	};

	return (
		<div className="form">
			<label htmlFor="long-url">
				<HiLink /> Paste in a long URL
				<input type="text" id="long-url" required value={longUrl} onChange={handleUpdateLongUrl} />
			</label>
			<label htmlFor="teeny-code">
				<GrMagic /> Customize your link?
				<input type="text" id="teeny-code" value={teenyCode} onChange={handleUpdateTeenyCode} />
			</label>
			<button type="submit" onClick={handleCreateTeenyLink}>
				teenify
			</button>
		</div>
	);
};

export default UrlForm;
