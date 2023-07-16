import {twMerge} from "tailwind-merge";
import {Metadata} from "next";
import prisma from "@/utils/prisma";
import {Preview} from "@/app/(admin)/_component/mdx/preview";
import {xQuery} from "@codemirror/legacy-modes/mode/xquery";
import {Code} from "@/_components/code";

export const metadata: Metadata = {
  title: 'Code Questions',
  description: 'KMUTT - Computer Engineering year 64 code answers.'
}

interface PageProps {
  params: {
    userid: string
    id: string

  }
  searchParams: { [key: string]: string | string[] | undefined }
}


export default async function Home({params, searchParams}: PageProps) {
  const question = await prisma.question.findUnique({
    where: {
      id: params.id
    }
  })
  if (!question?.description) return <></>
  return (
    <div className={twMerge("flex items-center flex-col")}>
      <Code description={question.description}/>
    </div>
  )
}
