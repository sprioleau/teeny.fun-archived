import Head from "next/head";
import type { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";

const RedirectPage: NextPage = () => {
	const router = useRouter();
	const { query } = router;
	const { to } = query;

	React.useEffect(() => {
		if (!query) router.push("/");

		const redirectUrl = to as string;
		const timeout = setTimeout(() => (window.location.href = redirectUrl), 3000);
		return () => clearTimeout(timeout);
	}, [router, query, to]);

	return (
		<div className="app">
			<Head>
				<title>Teeny.fun</title>
				<meta name="description" content="Make teeny tiny URLs with emojis 😂!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h2>Redirecting to {to as string}</h2>
			{/* <button onClick={() => router.push(ROOT_URL + (to as string))}>Redirect to {router.query.to}</button> */}
		</div>
	);
};

export default RedirectPage;
