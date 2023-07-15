"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/_components/input";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";
import { useRouter } from "next/navigation";

interface UserFormTypes {
	username: string;
	password: string;
}

export default function SignInForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<UserFormTypes>({});

	const router = useRouter();

	const onSubmit = handleSubmit(async (data) => {
		const resPromise = await fetch("/api/auth/signin", {
			method: "POST",
			body: JSON.stringify({
				username: data.username,
				password: data.password,
			}),
		});

		if (resPromise.ok) {
			router.push("/");
		} else {
			const res = await resPromise.json();

			interface ErrorMessage {
				name: string;
				message: string;
			}

			const errorMessage = JSON.parse(res.message) as ErrorMessage;
			setError(errorMessage.name as keyof UserFormTypes, {
				message: errorMessage.message,
			});
		}
	});

	const registerUsername = register("username", {
		required: {
			value: true,
			message: "username is required",
		},
		minLength: {
			value: 5,
			message: "username invalid",
		},
	});

	const registerPassword = register("password", {
		required: {
			value: true,
			message: "password is required",
		},
	});

	return (
		<>
			<form className={twMerge("flex flex-col")} onSubmit={onSubmit}>
				<Input
					label={"Username"}
					error={errors.username?.message}
					show={true}
					{...registerUsername}
				/>
				<Input
					label={"Password"}
					error={errors.password?.message}
					show={true}
					type="password"
					{...registerPassword}
				/>
				<BtnSubmit type={"submit"}>Login</BtnSubmit>
			</form>
		</>
	);
}

interface BtnSubmitProps extends ComponentProps<"button"> {}

function BtnSubmit(props: BtnSubmitProps) {
	const { className } = props;
	return (
		<button
			type={"submit"}
			className={twMerge(
				"bg-teritary w-full p-2 mt-1 rounded hover:bg-teritary-hover transition-all duration-300",
				className
			)}
			{...props}
		/>
	);
}
