import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface MainProps extends ComponentProps<"main"> {}

export default function Main(props: MainProps) {
	return (
		<div
			className={twMerge("flex flex-col p-4 w-full overflow-y-auto bg-primary")}
		>
			{props.children}
		</div>
	);
}
