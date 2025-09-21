import { SignupForm } from "../../components/auth/signup-form";

/**
 * User registration page for new users
 *
 * @returns JSX element with sign-up form interface
 *
 * @remarks
 * This page provides the registration interface for new users:
 * - Centers the sign-up form with responsive layout design
 * - Uses the SignupForm component for account creation
 * - Matches the visual design of the sign-in page for consistency
 *
 * The registration form typically collects:
 * - User's full name
 * - Email address
 * - Password with validation requirements
 * - Optional profile image
 *
 * The form includes validation for:
 * - Email format verification
 * - Password strength requirements (minimum 8 characters with numbers)
 * - Name field completion
 *
 * Upon successful registration, users are automatically signed in
 * and redirected to the application home page.
 */
const SignUpPage = () => {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<SignupForm />
			</div>
		</div>
	);
};

export default SignUpPage;
