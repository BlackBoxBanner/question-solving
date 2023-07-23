import { twMerge } from "tailwind-merge";
import { Metadata } from "next";
import prisma from "@/utils/prisma";
import { AuthForm, AuthMenu } from "@/app/auth/_component/authForm";

export const metadata: Metadata = {
	title: "Code Questions - Login",
	description: "KMUTT - Computer Engineering year 64 code answers.",
};

interface PageProps {
	params: {};
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ params, searchParams }: PageProps) {
	const user = await prisma.user.findMany({
		select: {
			username: true,
		},
	});

	function getValue({ users }: { users: { username: string }[] }): string[] {
		return users.map((user) => user.username);
	}

	function getMenuInit(props: PageProps["searchParams"]): AuthMenu {
		switch (props.signin) {
			case "username":
				return "username";
			case "register":
				return "register";
			default:
				return "username";
		}
	}

	return (
		<main
			className={twMerge(
				"bg-primary text-secondary min-h-screen h-screen relative"
			)}
		>
			<div
				className={twMerge(
					"h-full flex justify-center items-center overflow-auto"
				)}
			>
				<div
					className={twMerge(
						"md:border border-secondary rounded-xl p-4 md:w-1/3 w-full m-8 h-fit"
					)}
				>
					<AuthForm
						menuInit={getMenuInit(searchParams)}
						username={getValue({ users: user })}
					/>
				</div>
			</div>
		</main>
	);
}
