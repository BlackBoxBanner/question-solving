import { twMerge } from "tailwind-merge";
import { Metadata } from "next";
import prisma from "@/utils/prisma";
import { Preview } from "@/app/_components/code/preview";

export const metadata: Metadata = {
	title: "Code Questions",
	description: "KMUTT - Computer Engineering year 64 code answers.",
};

interface PageProps {
	params: {
		userid: string;
		id: string;
	};
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ params, searchParams }: PageProps) {
	const question = await prisma.question.findUnique({
		where: {
			id: params.id,
		},
	});
	if (!question?.description) return <></>;
	return (
		<main
			className={twMerge(
				"flex relative h-screen overflow-hidden flex-col md:flex-row"
			)}
		>
			<div className={twMerge("flex flex-col p-4 w-full overflow-y-auto")}>
				<div className={twMerge("flex items-center flex-col")}>
					<Preview description={question.description} />
				</div>
			</div>
		</main>
	);
}
