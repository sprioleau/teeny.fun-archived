import { getTopEmojis, isValidUrl, log, removeTrailingSlash } from "@utils";

import Head from "next/head";
import Link from "next/link";
import React from "react";
import { TopEmoji } from "../types";
import { User } from "@supabase/supabase-js";
import { supabase } from "@libs/subabase";

type IndexPageProps = {
	// urls: Url[] | [];
	topEmojis: TopEmoji;
};

const Home = ({
	// urls,
	topEmojis,
}: IndexPageProps) => {
	const [longUrl, setLongUrl] = React.useState<string>("");
	const [authedUser, setAuthedUser] = React.useState<User | null>(null);

	const isSet = (values: string | string[]) => {
		if (Array.isArray(values)) return values.every((value: string) => value.length > 0);
		return values.length > 0;
	};

	const handleUpdateLongUrl = (e: React.ChangeEvent<HTMLInputElement>) => setLongUrl(e.target.value);

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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { user, session, error } = await supabase.auth.signIn({
			provider: "github",
		});
	};

	const handleLogout = async (e: React.FormEvent) => {
		e.preventDefault();

		const { error } = await supabase.auth.signOut();

		if (error) console.error(error);
	};

	supabase.auth.onAuthStateChange((_, session) => {
		const user = session?.user || null;
		setAuthedUser(user);
	});

	return (
		<div className="app">
			<Head>
				<title>Teeny.fun</title>
				<meta name="description" content="Make teeny tiny URLs with emojis 😂!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1>Welcome to teeny.fun</h1>
				{!authedUser ? (
					<form onSubmit={handleSubmit}>
						<button type="submit">Login with GitHub</button>
					</form>
				) : (
					<>
						<h2>Current user is {authedUser?.email}</h2>
						<form onSubmit={handleLogout}>
							<button type="submit">Logout</button>
						</form>
					</>
				)}
				<div className="form">
					<label htmlFor="long-url">
						URL
						<input type="text" id="long-url" required value={longUrl} onChange={handleUpdateLongUrl} />
					</label>
					<button type="submit" onClick={handleCreateTeenyLink}>
						Create Teeny Link
					</button>
				</div>
				<p>
					<Link href="/">Login</Link> to Customize your teeny code.
				</p>
				<p>
					<Link href="/">Already have an account?</Link>
				</p>
				{topEmojis && (
					<table>
						<thead>
							<tr>
								<th>Emoji</th>
								<th>Hits</th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(topEmojis)
								.sort(([emojiA, hitsA], [emojiB, hitsB]) => hitsB - hitsA)
								.map(([emoji, hits]) => (
									<tr key={emoji}>
										<td>{emoji}</td>
										<td>{hits}</td>
									</tr>
								))
								.slice(0, 10)}
						</tbody>
					</table>
				)}
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
	// let urls = [];
	let topEmojis = null;

	const { data, error } = await supabase.from("urls").select().limit(100);

	if (!error && data) {
		// urls = data;
		topEmojis = getTopEmojis(data);
	}

	return {
		props: {
			// urls,
			topEmojis,
		},
	};
};
