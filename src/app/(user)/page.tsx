import {NavBar} from "@/app/_components/nav";
import Any from "@/app/_components/test.mdx"
import {twMerge} from "tailwind-merge";

export default function Home() {
  return (
    <main className={twMerge("flex min-h-screen flex-col")}>
      {/*<NavBar/>*/}
      <Any/>
    </main>
  )
}
