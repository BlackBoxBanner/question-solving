import {sessionHandle} from "@/utils/session";
import {twMerge} from "tailwind-merge";
import prisma from "@/utils/prisma";
import {MDXRemote} from "next-mdx-remote/rsc";
import {MdPreview} from "md-editor-rt";
import {Preview} from "@/app/(admin)/_component/mdx/preview";
import Link from "next/link";

export default async function Home() {
  const session = await sessionHandle()

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
      <div className={twMerge("divide-secondary divide-x flex flex-col gap-4 md:w-[50rem]")}>
        {
          questions.map((user, index, array) => {
            return (
              <>
                <div className={twMerge("overflow-hidden flex flex-col gap-6")}>
                  <div className={twMerge("bg-primary-light overflow-auto border border-secondary rounded p-2")}>
                    <p>
                      {`Name : ${user.name}`}
                    </p>
                    <p>
                      {`Line ID : ${user.lineId}`}
                    </p>
                    <p>
                      {`Discord ID : ${user.discordId}`}
                    </p>
                    <p>
                      {`Question count : ${user.Task.length}`}
                    </p>
                  </div>
                  {user.Task.map((value, index, array) => {
                    return (
                      <>
                        <div className={twMerge("flex flex-col gap-1")}>
                          <Link href={`/admin/code/${value.userId}/${value.id}`} className={twMerge("text-xl")}>
                            {`Title : ${value.title}`}
                          </Link>
                          <Preview description={value.description} key={index}/>
                        </div>
                      </>
                    )
                  })}
                </div>

              </>
            )
          })
        }
      </div>
    </main>
  );
}
