import { Logo, UrlForm } from "components";

import Head from "next/head";
import React from "react";
import { TopEmoji } from "../types";
import { User } from "@supabase/supabase-js";
import { getTopEmojis } from "@utils";
import { supabase } from "@libs/subabase";

type IndexPageProps = {
	// urls: Url[] | [];
	topEmojis: TopEmoji;
};

const Home = ({
	// urls,
	topEmojis,
}: IndexPageProps) => {
	const [authedUser, setAuthedUser] = React.useState<User | null>(null);

	// const handleLogout = async (e: React.FormEvent) => {
	// 	e.preventDefault();

	// 	const { error } = await supabase.auth.signOut();

	// 	if (error) console.error(error);
	// };

	supabase.auth.onAuthStateChange((_, session) => {
		const user = session?.user || null;
		setAuthedUser(user);
	});

	// const handleSubmit = async (e: React.FormEvent) => {
	// 	e.preventDefault();

	// 	const { user, session, error } = await supabase.auth.signIn({
	// 		provider: "github",
	// 	});
	// };

	return (
		<div className="app">
			<Head>
				<title>Teeny.fun</title>
				<meta name="description" content="Make teeny tiny URLs with emojis 😂!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="main">
				<div className="home-page">
					<h1>
						<span aria-hidden={true} hidden={true}>
							teeny.fun
						</span>
						<span>
							<Logo size="20rem" />
						</span>
					</h1>

					{/* {!authedUser ? (
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
				)} */}
					<UrlForm />
					{/* <p>
					<Link href="/">Sign up</Link> to update your links.
				</p>
				<p>
					<Link href="/">Already have an account?</Link>
				</p> */}
					{/* {topEmojis && (
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
				)} */}
				</div>
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
