import {NavBar} from "@/app/_components/nav";
import {twMerge} from "tailwind-merge";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Code Questions',
  description: 'KMUTT - Computer Engineering year 64 code answers.'
}

interface PageProps {
  params: {}
  searchParams: { [key: string]: string | string[] | undefined }
}


export default function Home({params, searchParams}: PageProps) {

  return (
    <main className={twMerge("flex min-h-screen flex-col")}>
      <NavBar/>
    </main>
  )
}
