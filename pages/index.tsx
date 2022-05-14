import Head from 'next/head'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
		<div className="app">
			<Head>
				<title>Teeny.fun</title>
				<meta name="description" content="Make teeny tiny URLs with emojis 😂!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1>
					Welcome to teeny.fun
				</h1>
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
}

export default Home
