"use client";

import { useRouter } from "next/navigation";
import { ImBin } from "react-icons/im";
import { twMerge } from "tailwind-merge";

export default function DeleteButton({ id }: { id: string }) {
	const router = useRouter();

	async function onClickHandler() {
		const resPrommiss = await fetch("/api/questions/delete", {
			method: "POST",
			body: JSON.stringify({ id }),
		});

		if (resPrommiss.ok) router.refresh();
	}

	return (
		<button
			className={twMerge("absolute top-2 right-2 p-1 z-10")}
			onClick={onClickHandler}
		>
			<ImBin />
		</button>
	);
}
