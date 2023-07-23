import prisma from "@/utils/prisma";
import { sessionHandle } from "@/utils/session";
import { Question } from "@prisma/client";
import { Metadata } from "next";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Button from "../_components/createButton";
import DeleteButton from "../_components/deleteButton";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "user user",
};

export default async function Dashboard() {
	const session = await sessionHandle();
	const questions = await prisma.question.findMany({
		where: {
			userId: session?.data.id,
		},
	});

	return (
		<main
			className={twMerge("bg-primary text-secondary h-screen flex relative")}
		>
			<div className={twMerge("overflow-y-auto p-8 w-full")}>
				<div className={twMerge("flex flex-col md:px-80 gap-8")}>
					<div className={twMerge("flex justify-between")}>
						<h1 className={twMerge("text-2xl")}>Questions</h1>
						<Button />
					</div>
					<div
						className={twMerge("flex flex-col gap-4 md:grid md:grid-cols-2 ")}
					>
						<Card questions={questions} />
					</div>
				</div>
			</div>
		</main>
	);
}

function Card({ questions }: { questions: Question[] }) {
	return questions.map((value, index, array) => {
		const { title, description, updatedAt, createdAt, id } = value;
		return (
			<div key={index} className={twMerge("relative")}>
				<DeleteButton id={value.id} />
				<Link href={`/dashboard/${id}`}>
					<div
						className={twMerge(
							"border border-secondary rounded p-4 flex flex-col gap-2 h-28"
						)}
					>
						<h2 className={twMerge("text-xl truncate")}>{title}</h2>
						<div className={twMerge("text-xs text-secondary")}>
							<div>{`create at : ${createdAt.toLocaleString()}`}</div>
							{createdAt.toLocaleString() != updatedAt.toLocaleString() && (
								<div>{`update at : ${updatedAt.toLocaleString()}`}</div>
							)}
						</div>
					</div>
				</Link>
			</div>
		);
	});
}
