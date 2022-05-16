// https://nextjs.org/docs/api-reference/next.config.js/rewrites

/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: "/:code*",
				destination: "/api/:code*", // The :path parameter isn't used here so will be automatically passed in the query
			},
		];
	},
};

module.exports = nextConfig;
