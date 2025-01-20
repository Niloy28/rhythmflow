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
import { Label } from "@/components/ui/label";
import { signUp } from "@/actions/auth-actions";
import Link from "next/link";

export function SignupForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Sign Up</CardTitle>
					<CardDescription>
						Enter your email below to create a new account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={signUp}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="name">Name</Label>
								<Input id="name" type="text" placeholder="John Doe" required />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>

								<Input id="password" type="password" required />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="confirm-password">Confirm Password</Label>

								<Input id="confirm-password" type="password" required />
							</div>
							<Button type="submit" className="w-full">
								Sign Up
							</Button>

							<div className="mt-4 text-center text-sm">
								Already have an account?{" "}
								<Link href="/login" className="underline underline-offset-4">
									Login here
								</Link>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
