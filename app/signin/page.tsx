import SignInForm from "@/components/auth/signin-form";
import React from "react";

/**
 * User authentication page for existing users
 *
 * @returns JSX element with sign-in form interface
 *
 * @remarks
 * This page provides the authentication interface for returning users:
 * - Centers the sign-in form on the page with responsive layout
 * - Uses the SignInForm component which handles both email/password
 *   and OAuth authentication methods
 * - Responsive padding adjusts for different screen sizes
 *
 * The form supports multiple authentication methods:
 * - Email and password login
 * - Google OAuth integration
 * - Password recovery flows
 *
 * After successful authentication, users are typically redirected
 * to their intended destination or the home page.
 */

const SignInPage = () => {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<SignInForm />
			</div>
		</div>
	);
};

export default SignInPage;
