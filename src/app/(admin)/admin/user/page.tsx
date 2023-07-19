import {twMerge} from "tailwind-merge";
import prisma from "@/utils/prisma";
import {Card} from "@/app/(admin)/admin/user/_components/card";

export default async function Home() {
  const user = await prisma.user.findMany()
  return (
    <main className={twMerge("flex flex-col gap-4 md:items-center md:p-6")}>
      <div className={twMerge("grid md:grid-cols-2 grid-cols-1 md:w-[50rem] gap-4")}>
        {user.map((value, index, array) => {
          return <Card user={value} key={index}/>
        })}
      </div>
    </main>
  );
}
