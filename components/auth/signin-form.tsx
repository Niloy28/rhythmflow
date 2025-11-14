"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { authClient } from "@/lib/auth-client";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";

/**
 * Props for the SignInForm component
 */
export interface SignInFormProps extends React.ComponentPropsWithoutRef<"div"> {
	/** Optional CSS class name for styling */
	className?: string;
}

/**
 * User authentication form for existing users to sign in
 *
 * @param props - Component props including className and standard div props
 * @returns JSX element containing the complete sign-in form interface
 *
 * @remarks
 * This component provides a comprehensive sign-in experience:
 * - Email and password authentication with validation
 * - Form validation using Zod schema and React Hook Form
 * - Integration with Better Auth for secure authentication
 * - Toast notifications for error feedback
 * - Loading states with spinner animations
 *
 * **Form Validation**: Uses Zod schema for client-side validation:
 * - Email format validation
 * - Required field validation
 * - Real-time error display with FormMessage components
 *
 * **Authentication Flow**:
 * 1. Client-side form validation
 * 2. Better Auth email/password sign-in
 * 3. Automatic redirect to home page on success
 * 4. Error handling with user-friendly messages
 *
 * **User Experience Features**:
 * - Disabled submit button during form submission
 * - Loading spinner animation during authentication
 * - Links to password reset and sign-up pages
 * - Consistent card-based layout with clear typography
 *
 * **Error Handling**: Provides specific error messages:
 * - Server errors (500): Generic "try again later" message
 * - Authentication errors: "Username or password incorrect"
 * - Form validation errors: Field-specific inline messages
 */
const SignInForm = ({ className, ...props }: SignInFormProps) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [isSignedIn, setIsSignedIn] = useState(false);

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	/**
	 * Handles form submission and authentication
	 */
	const onSubmit = async (values: z.infer<typeof signInSchema>) => {
		const result = await authClient.signIn.email({
			email: values.email,
			password: values.password,
			callbackURL: "/",
		});

		if (result.error) {
			// Close alert dialog in case of sign in error
			setDialogOpen(false);
			let errorMsg: string;
			if (result.error.status === 500) {
				errorMsg = "An unexpected error occurred. Please try again later.";
			} else {
				errorMsg = "Your username or password is incorrect.";
			}
			toast.error(errorMsg);
		} else {
			setIsSignedIn(true);
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Sign In</CardTitle>
					<CardDescription>
						Enter your credentials below to sign in to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="email@example.com"
												type="email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center">
											<FormLabel>Password</FormLabel>
											{/* TODO: Add password reset feature */}
											<Link
												href="/password-reset"
												className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
											>
												Forgot your password?
											</Link>
										</div>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
								<AlertDialogTrigger asChild>
									<Button
										type="submit"
										className="w-full mt-4"
										disabled={form.formState.isSubmitting}
									>
										Sign In
										{form.formState.isSubmitting && (
											<Loader2 className="animate-spin" />
										)}
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle className="flex justify-between items-center">
											<span>
												{isSignedIn ? "Signed In Successfully" : "Signing In"}
											</span>
											<span>
												{isSignedIn ? (
													<Check />
												) : (
													<Loader2 className="animate-spin" />
												)}
											</span>
										</AlertDialogTitle>
									</AlertDialogHeader>
								</AlertDialogContent>
							</AlertDialog>
							<div className="mt-4 text-center text-sm">
								Don&apos;t have an account?{" "}
								<Link href="/signup" className="underline underline-offset-4">
									Sign up
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignInForm;
