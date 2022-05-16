import { constructTeenyUrl, isEmoji, isValidUrl } from "../utils";

import Head from "next/head";
import React from "react";
import { Url } from "../types";
import emojiUnicode from "emoji-unicode";
import removeTrailingSlash from "../utils/removeTrailingSlash";
import { supabase } from "../libs/subabase";

type IndexPageProps = {
	urls: Url[] | [];
};

const Home = ({ urls }: IndexPageProps) => {
	const [longUrl, setLongUrl] = React.useState<string>("");
	const [emojis, setEmojis] = React.useState<string>("");
	const [addedUrls, setAddedUrls] = React.useState<Url[] | []>([]);

	const isSet = (values: string | string[]) => {
		if (Array.isArray(values)) return values.every((value: string) => value.length > 0);
		return values.length > 0;
	};

	const handleUpdateLongUrl = (e: React.ChangeEvent<HTMLInputElement>) => setLongUrl(e.target.value);
	const handleUpdateEmojis = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmojis(e.target.value);
	};

	const handleCreateTeenyLink = async () => {
		if (!isSet([longUrl, emojis])) return alert("Required fields not set");
		if (!isValidUrl(longUrl)) return alert("Not a valid URL");
		if (!isEmoji(emojis)) return alert("Emojis only, please!");

		const newUrl = {
			teeny_code: emojiUnicode.raw(emojis),
			long_url: String(removeTrailingSlash(longUrl)),
			emojis: emojis.trim(),
		};

		const queryString = new URLSearchParams(newUrl);
		const response = await fetch(`/api/createTeenyUrl?${queryString}`);
		const { data, error } = await response.json();

		if (!error) {
			const newlyAddedUrl: Url = data[0];
			setLongUrl("");
			setEmojis("");
			setAddedUrls((addedUrls) => [...addedUrls, newlyAddedUrl]);
		}

		console.log({ data, error });
	};

	return (
		<div className="app">
			<Head>
				<title>Teeny.fun</title>
				<meta name="description" content="Make teeny tiny URLs with emojis 😂!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1>Welcome to teeny.fun</h1>
				<div className="form">
					<label htmlFor="long-url">
						URL
						<input type="text" id="long-url" required value={longUrl} onChange={handleUpdateLongUrl} />
					</label>
					<label htmlFor="emojis">
						Emojis
						<input type="text" id="emojis" required value={emojis} onChange={handleUpdateEmojis} />
					</label>
					<button type="submit" onClick={handleCreateTeenyLink}>
						Create Teeny Link
					</button>
				</div>
				{urls.length > 0 ? (
					<ul>
						{[...urls, ...addedUrls].map(({ id, emojis, hits, long_url }) => (
							<li key={id}>
								<a href={`/redirect?to=${long_url}`}>{constructTeenyUrl(emojis)}</a>
								<span>Hits: {hits}</span>
							</li>
						))}
					</ul>
				) : null}
			</main>

			<footer>
				<p>
					Built by{" "}
					<a href="https://sprioleau.dev" target="_blank" rel="noopener noreferrer">
						San&apos;Quan Prioleau
					</a>
				</p>
			</footer>
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	let urls = [];
	const { data, error } = await supabase.from("urls").select();

	if (!error && data) urls = data;

	return {
		props: {
			urls,
		},
	};
};
