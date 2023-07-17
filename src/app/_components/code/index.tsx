import {twMerge} from "tailwind-merge";
import {Preview} from "@/app/_components/code/preview";

interface CodeProps {
  description: string
}

export function Code({description}: CodeProps) {
  return (
    <>
      <div className={twMerge("md:w-[50rem] w-full -z-10")}>
        <Preview description={description}/>
      </div>
    </>
  )
}