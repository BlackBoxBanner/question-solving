import {sessionHandle} from "@/utils/session";
import {twMerge} from "tailwind-merge";
import prisma from "@/utils/prisma";
import Link from "next/link";
import {Metadata} from "next";
import {Card} from "@/app/(admin)/admin/user/_components/card";

export const metadata: Metadata = {
  title: 'Code Questions',
  description: 'KMUTT - Computer Engineering year 64 code answers.'
}

interface PageProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Home({params}: PageProps) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    }
  })

  const questions = await prisma.question.findMany({
    where: {
      userId: params.id
    }
  })

  if (!user) return <>No user found</>

  return (
    <main className={twMerge("flex flex-col gap-4 md:items-center md:p-6")}>
      <div className={twMerge("flex flex-col md:w-[50rem] gap-4")}>
        <Card user={user}>
          <p>Question Count :</p>
          <p>{questions.length}</p>
        </Card>
        <div>
          <ol className={"list-decimal"}>
            {questions.map((value, index, array) => {
              return (
                <>
                  <Link href={`/admin/code/${user.id}/${value.id}`} className={"hover:text-primary-light transition-colors ease-in-out duration-150"}>
                    <li>{`${value.title} ${value.createdAt.toLocaleString()}`}</li>
                  </Link>
                </>
              )
            })}
          </ol>
        </div>
      </div>
    </main>
  );
}
