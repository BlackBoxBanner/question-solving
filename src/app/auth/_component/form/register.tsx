"use client";

import { useForm } from "react-hook-form";
import Input from "@/app/_components/input";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";
import { RegisterFormProps } from "../authForm";
import { useRouter } from "next/navigation";

interface UserFormTypes {
	name: string;
	username: string;
	password: string;
	confirmPassword: string;
	discordId: string;
	lineId: string;
}

export default function RegisterForm({ username }: RegisterFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<UserFormTypes>({});

	const router = useRouter();
	const onSubmit = handleSubmit(async (data) => {
		const resPromise = await fetch("/api/auth/register", {
			method: "POST",
			body: JSON.stringify(data),
		});

		if (resPromise.ok) router.push("/");

		const res = await resPromise.json();

		interface ErrorMessage {
			name: string;
			message: string;
		}

		const errorMessage = JSON.parse(res.message) as ErrorMessage;
		setError(errorMessage.name as keyof UserFormTypes, {
			message: errorMessage.message,
		});
	});

	return (
		<>
			<form
				id={"register"}
				className={twMerge("flex flex-col")}
				onSubmit={onSubmit}
			>
				<Input
					label={"Name *"}
					error={errors.name?.message}
					show={true}
					{...register("name", {
						required: {
							value: true,
							message: "Name is required",
						},
					})}
				/>
				<Input
					label={"Username *"}
					error={errors.username?.message}
					show={true}
					{...register("username", {
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
							return test ? "This username was taken" : true;
						},
					})}
				/>
				<Input
					label={"Password *"}
					error={errors.password?.message}
					type="password"
					show={true}
					{...register("password", {
						required: {
							value: true,
							message: "Password require",
						},
					})}
				/>
				<Input
					label={"Confirm Password *"}
					error={errors.confirmPassword?.message}
					type="password"
					show={true}
					{...register("confirmPassword", {
						required: {
							value: true,
							message: "Password require",
						},
						validate: (value, formState) => {
							const data = value == formState.password;
							return !data ? "Password not match." : true;
						},
					})}
				/>
				<Input
					label={"Discord ID"}
					error={errors.discordId?.message}
					show={true}
					{...register("discordId")}
				/>
				<Input
					label={"Line ID"}
					error={errors.lineId?.message}
					show={true}
					{...register("lineId")}
				/>
				<BtnSubmit type={"submit"} form={"register"}>
					Register
				</BtnSubmit>
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
