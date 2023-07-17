import {sessionHandle} from "@/utils/session";
import {twMerge} from "tailwind-merge";
import prisma from "@/utils/prisma";
import {Metadata} from "next";
import UserForm from "@/app/(admin)/_component/form/userForm";

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

export default async function Home({params, searchParams}: PageProps) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id
    }
  })

  const allUser = await prisma.user.findMany({
      select: {
        username: true
      }
    }
  )

  if (!user) return <>No user found</>
  return (
    <main className={twMerge("flex flex-col gap-4 md:items-center md:p-6")}>
      <div className={twMerge("grid md:grid-cols-2 grid-cols-1 md:w-[50rem] gap-4")}>
        <UserForm user={user} allUser={allUser}/>
      </div>
    </main>
  );
}
