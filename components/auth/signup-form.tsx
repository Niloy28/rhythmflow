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
import { signUpSchema } from "@/lib/zod-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

/**
 * Props for the SignupForm component
 */
export interface SignupFormProps extends React.ComponentPropsWithoutRef<"div"> {
	/** Optional CSS class name for styling */
	className?: string;
}

/**
 * User registration form for creating new accounts
 *
 * @param props - Component props including className and standard div props
 * @returns JSX element containing the complete sign-up form interface
 *
 * @remarks
 * This component provides a comprehensive user registration experience:
 * - Collects user name, email, and password with validation
 * - Optional profile image field for user avatars
 * - Form validation using Zod schema and React Hook Form
 * - Integration with Better Auth for secure account creation
 *
 * **Form Fields and Validation**:
 * - Name: Required, trimmed of whitespace
 * - Email: Must be valid email format
 * - Password: Minimum 8 characters with at least 1 number
 * - Image: Optional profile image URL
 *
 * **Navigation**: Uses Next.js router for programmatic navigation
 * after successful registration.
 */
const SignupForm = ({ className, ...props }: SignupFormProps) => {
	const router = useRouter();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
			image: "",
		},
	});

	/**
	 * Handles form submission and account creation
	 */
	const onSubmit = useCallback(
		async (values: z.infer<typeof signUpSchema>) => {
			const result = await authClient.signUp.email({
				email: values.email,
				name: values.name,
				password: values.password,
				image: values.image ?? "",
				callbackURL: "/",
			});

			if (result.error) {
				toast({
					variant: "destructive",
					title: "Uh oh! Something went wrong.",
					description:
						"There was a problem with the request. Please try again later.",
				});
			} else {
				router.push("/");
			}
		},
		[toast, router]
	);

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Sign Up</CardTitle>
					<CardDescription>
						Enter your details below to create a new account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="John Doe" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

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
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit" className="w-full mt-4">
								Sign Up{" "}
								{form.formState.isSubmitting && (
									<Loader2 className="animate-spin" />
								)}
							</Button>

							<div className="mt-4 text-center text-sm">
								Already have an account?{" "}
								<Link href="/signin" className="underline underline-offset-4">
									Sign in here
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignupForm;
