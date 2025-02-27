import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	serverExternalPackages: ["@libsql/client", "@libsql/kysely-libsql"],
	experimental: {
		serverActions: {
			bodySizeLimit: "30mb",
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "pub-*.r2.dev",
				port: "",
				pathname: "**",
				search: "",
			},
		],
	},
};

export default nextConfig;
