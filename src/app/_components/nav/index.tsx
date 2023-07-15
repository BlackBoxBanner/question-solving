import { twMerge } from "tailwind-merge";
import { Cinzel } from "next/font/google";
import { sessionHandle } from "@/utils/session";
import { Button } from "@/app/_components/nav/loginBtn";

const CinzelFont = Cinzel({
	weight: "400",
	subsets: ["latin", "latin-ext"],
});

export async function NavBar() {
	const session = await sessionHandle();
  
	return (
		<>
			<div
				className={twMerge(
					"w-full h-16 p-2 px-8 flex items-center justify-between"
				)}
			>
				<div
					className={twMerge(
						"text-2xl flex text-teritary",
						CinzelFont.className
					)}
				>
					Code Questions
				</div>
				<div></div>
				<div>
					<Button session={session} />
				</div>
			</div>
		</>
	);
}
