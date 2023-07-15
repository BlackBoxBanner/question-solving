"use client";

import { Session } from "@/utils/session/types";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Button({ session }: { session: undefined | Session }) {
	const router = useRouter();
	async function logoutHandler() {
		const res = await fetch("/api/auth/signout", {
			method: "POST",
		});
		if (res.ok) router.refresh();
	}

	return !session ? (
		<LinkComponent href={"/auth?signin=signin"}>Sign in</LinkComponent>
	) : (
		<ButtonComponent onClick={logoutHandler}>Log Out</ButtonComponent>
	);
}

interface LinkProps extends ComponentProps<typeof Link> {}

const BtnClassName = twMerge(
	"bg-primary p-2 px-3 rounded hover:bg-primary-hover transition-colors ease-in-out duration-300 "
);
function LinkComponent(props: LinkProps) {
	return (
		<Link className={BtnClassName} {...props}>
			{String(props.children).toUpperCase()}
		</Link>
	);
}

interface ButtonProps extends ComponentProps<"button"> {}

function ButtonComponent(props: ButtonProps) {
	return (
		<button className={BtnClassName} {...props}>
			{String(props.children).toUpperCase()}
		</button>
	);
}
