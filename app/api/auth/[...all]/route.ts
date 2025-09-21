import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

/**
 * Next.js API route handlers for Better Auth authentication
 *
 * @remarks
 * This catch-all route ([...all]) handles all Better Auth endpoints including:
 * - User registration and login
 * - OAuth provider callbacks (Google)
 * - Session management
 * - Password reset flows
 * - Account verification
 *
 * The toNextJsHandler converts Better Auth's internal handlers to Next.js
 * compatible route handlers that can process both GET and POST requests.
 *
 * Endpoints are automatically generated based on Better Auth configuration
 * and are accessible at `/api/auth/*` paths.
 */
export const { POST, GET } = toNextJsHandler(auth);
