import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentProps<"input"> {
	label: string;
	error?: string;
	show?: boolean;
	// add any additional props specific to your component
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { className, label, error, show = false, ...rest } = props; // extract className from props

	return (
		<div className={"font-outfit text-secondary"}>
			<label
				htmlFor={rest.id}
				className={twMerge(
					"font-outfit-heavy text-base text-secondary",
					error && "text-error"
				)}
			>
				{label}
			</label>
			<div className={twMerge("relative")}>
				<input
					type="text"
					className={twMerge(
						"appearance-none text-secondary bg-primary w-full text-base border border-secondary p-1 px-2 rounded focus:border-teritary active:border-teritary transition-colors ease-in-out duration-100",
						className,
						error && "border-error"
					)}
					ref={ref}
					{...rest}
				/>
			</div>
			<p className={twMerge("text-error text-xs", show && "h-6")}>{error}</p>
		</div>
	);
});

Input.displayName = "Input";

export default Input;
export { Input };
