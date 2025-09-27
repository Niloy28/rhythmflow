import { env } from "@/env/client";
import { createAuthClient } from "better-auth/react";

/**
 * Client-side authentication instance for React components
 * Configured with the base URL from environment variables
 *
 * @remarks
 * This client is used for authentication operations in client-side React components,
 * such as login forms, sign-up flows, and session management in the browser.
 */
export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL, // the base url of your auth server
});
