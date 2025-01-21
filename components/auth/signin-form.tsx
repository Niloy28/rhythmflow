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
import { useCallback } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignInForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const router = useRouter();
	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = useCallback(
		async (values: z.infer<typeof signInSchema>) => {
			await authClient.signIn.email({
				email: values.email,
				password: values.password,
			});

			router.push("/");
		},
		[router]
	);

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your credentials below to login to your account
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

							<Button type="submit" className="w-full mt-4">
								Login
							</Button>
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
}
