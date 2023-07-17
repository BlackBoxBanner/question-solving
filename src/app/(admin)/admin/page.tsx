import {sessionHandle} from "@/utils/session";
import {twMerge} from "tailwind-merge";
import prisma from "@/utils/prisma";
import Link from "next/link";

export default async function Home() {
  const questions = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      discordId: true,
      lineId: true,
      Task: true
    }
  })
  return (
    <main className={twMerge("flex flex-col gap-4 md:items-center md:p-6")}>
      <div className={twMerge("grid md:grid-cols-2 grid-cols-1 md:w-[50rem] gap-4")}>
        {
          questions.map((user, index, array) => {
            return (
              <>
                <Link href={`/admin/user/${user.id}`}
                      key={index}
                      className={twMerge("bg-primary-light overflow-auto border border-secondary rounded p-2")}>
                  <p className={twMerge("text-xl")}>
                    {user.name}
                  </p>
                  <p>
                    {`Question count : ${user.Task.length}`}
                  </p>
                </Link>
              </>
            )
          })
        }
      </div>
    </main>
  );
}
