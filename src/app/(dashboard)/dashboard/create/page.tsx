import { twMerge } from "tailwind-merge";
import { Metadata } from "next";
import Editor from "@/app/(dashboard)/_components/create";
import { sessionHandle } from "@/utils/session";

export const metadata: Metadata = {
	title: "Question - create",
	description: "create question",
};

interface PageProps {
	params: {
		id: string;
	};
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ params, searchParams }: PageProps) {
	const session = await sessionHandle();
	if (!session?.data.id) return <></>;
	return (
		<main className={twMerge("flex min-h-screen flex-col md:px-60 gap-8")}>
			<div>
				<Editor id={session.data.id} />
			</div>
		</main>
	);
}
