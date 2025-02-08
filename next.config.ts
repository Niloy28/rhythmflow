import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	serverExternalPackages: ["@libsql/client", "@libsql/kysely-libsql"],
	experimental: {
		serverActions: {
			bodySizeLimit: "3mb",
		},
	},
};

export default nextConfig;
