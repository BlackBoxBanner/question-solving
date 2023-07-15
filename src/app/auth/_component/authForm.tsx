"use client";

import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import SignInForm from "./form/signin";
import RegisterForm from "./form/register";
import { useRouter } from "next/router";

export interface RegisterFormProps {
	username: string[];
}

export type AuthMenu = "username" | "register" | undefined;

interface AuthFormProps extends RegisterFormProps {
	menuInit: AuthMenu;
}

export function AuthForm({ menuInit, username }: AuthFormProps) {
	const [menu, setMenu] = useState<AuthMenu>(menuInit);

	return (
		<>
			<div
				className={twMerge(
					"border rounded divide-x border-secondary flex justify-center items-center mb-8"
				)}
			>
				<Btn
					active={menu == "username" ? 1 : 0}
					onClick={() => setMenu("username")}
				>
					Login
				</Btn>
				<Btn
					active={menu == "register" ? 1 : 0}
					onClick={() => setMenu("register")}
				>
					Register
				</Btn>
			</div>
			{menu == "username" && <SignInForm />}
			{menu == "register" && <RegisterForm username={username} />}
		</>
	);
}

interface BtnProps extends ComponentProps<"button"> {
	active: 0 | 1;
}

function Btn(props: BtnProps) {
	const { className, active } = props;
	return (
		<button
			className={twMerge(
				"w-full p-1 bg-primary",
				active && "bg-primary-hover",
				className
			)}
			{...props}
		/>
	);
}
