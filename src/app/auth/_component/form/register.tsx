"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/_components/input";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";
import { RegisterFormProps } from "../authForm";

interface UserFormTypes {
	name: string;
	username: string;
	password: string;
	discordId: string;
	lineId: string;
}

export default function RegisterForm({ username }: RegisterFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserFormTypes>({});

	const onSubmit = handleSubmit((data) => {
		console.log(data);
	});

	const registerUsername = register("username", {
		required: {
			value: true,
			message: "Username is required",
		},
		minLength: {
			value: 5,
			message: "username invalid",
		},
		validate: (value = "", formValues) => {
			const test = username.includes(value);
			return test! && "This username was taken";
		},
	});

	const registerPassword = register("password", {
		required: {
			value: true,
			message: "Password is required",
		},
	});

	const registerName = register("name", {
		required: {
			value: true,
			message: "Name is required",
		},
	});

	const registerDiscord = register("name", {});

	const registerLine = register("name", {});

	return (
		<>
			<form className={twMerge("flex flex-col")} onSubmit={onSubmit}>
				<Input
					label={"Name *"}
					error={errors.name?.message}
					show={true}
					{...registerName}
				/>
				<Input
					label={"Username *"}
					error={errors.username?.message}
					show={true}
					{...registerUsername}
				/>
				<Input
					label={"Password *"}
					error={errors.password?.message}
					show={true}
					{...registerPassword}
				/>
				<Input
					label={"Discord ID"}
					error={errors.discordId?.message}
					show={true}
					{...registerDiscord}
				/>
				<Input
					label={"Line ID"}
					error={errors.lineId?.message}
					show={true}
					{...registerLine}
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
