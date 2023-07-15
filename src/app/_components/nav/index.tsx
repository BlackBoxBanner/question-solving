import {twMerge} from "tailwind-merge";
import {Cinzel} from "next/font/google"

const CinzelFont = Cinzel({
  weight: "400",
  subsets: ["latin", "latin-ext"],
})

export function NavBar() {
  return (
    <>
      <div className={twMerge("w-full bg-amber-200 h-14 p-2 px-4 flex items-center justify-between")}>
        <div className={twMerge("text-xl flex", CinzelFont.className)}>
          Code Questions
        </div>
        {/*<div>2</div>*/}
        <div>
          a
        </div>
      </div>
    </>
  )
}