import {twMerge} from "tailwind-merge";
import {Metadata} from "next";
import SignInForm from "@/app/auth/_component/form/signin";

export const metadata: Metadata = {
  title: 'Code Questions - Login',
  description: 'KMUTT - Computer Engineering year 64 code answers.'
}

interface PageProps {
  params: {}
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Home({params, searchParams}: PageProps) {
  return (
    <main className={twMerge("h-full flex justify-center items-center")}>
      <div className={twMerge("md:border border-secondary rounded-xl p-4 md:w-1/3 w-full m-8")}>
        <SignInForm/>
      </div>
    </main>
  )
}
