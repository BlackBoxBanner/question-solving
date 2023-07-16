import { twMerge } from "tailwind-merge";
import { Metadata } from "next";
import prisma from "@/utils/prisma";
import Editor from "@/app/(dashboard)/_components/editor";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "user user",
};

interface PageProps {
	params: {
		id: string;
	};
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ params, searchParams }: PageProps) {
	const question = await prisma.question.findUnique({
		where: {
			id: params.id,
		},
		select: {
			title: true,
			description: true,
			id: true,
		},
	});
	return (
		<main className={twMerge("flex min-h-screen flex-col md:px-60 gap-8")}>
			<div>
				{question && (
					<Editor
						description={question.description}
						title={question.title}
						id={question.id}
					/>
				)}
			</div>
		</main>
	);
}
