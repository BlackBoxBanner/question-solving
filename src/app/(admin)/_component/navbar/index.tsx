"use client"

import {twMerge} from "tailwind-merge";
import {Session} from "@/utils/session/types";
import {ComponentProps, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {HiOutlineMenu} from "react-icons/hi"
import {MdClose} from "react-icons/md"


export default function NavBar({session}: { session: Session }) {
  const [menu, setMenu] = useState(false)
  const router = useRouter()

  async function logoutHandler() {
    const res = await fetch("/api/auth/signout", {
      method: "POST",
    });
    if (res.ok) router.refresh();
  }

  return <>
    <nav
      className={twMerge("bg-primary-hover p-4 shadow-md flex md:flex-col flex-row transition-all duration-300 ease-in-out md:w-56 justify-between md:justify-normal md:h-full w-full h-16 gap-4 divide-secondary md:divide-y")}>
      <header className={twMerge("")}>
        <div className={twMerge("text-2xl truncate")}>
          {session?.data.name}
        </div>
      </header>
      <div
        className={twMerge("flex flex-col gap-2 md:h-full md:pt-4 md:bg-primary-hover", !menu && "hidden md:flex", "md:relative absolute top-0 left-0 w-full bg-primary-light p-4 md:p-0 md:pt-4")}>
        <ItemBtn href={"/admin"}>Dashboard</ItemBtn>
        <ItemBtn href={"/admin/user"}>User</ItemBtn>
        <Btn onClick={logoutHandler}>Logout</Btn>
        <button className={twMerge("md:hidden flex justify-center items-center")} onClick={() => setMenu(e => !e)}>
          <MdClose size={45}/>
        </button>
      </div>
      <button className={twMerge("md:hidden flex justify-center items-center")} onClick={() => setMenu(e => !e)}>
        <HiOutlineMenu size={25}/>
      </button>
    </nav>
  </>
}

interface ItemProps extends ComponentProps<typeof Link> {

}

function ItemBtn({className, ...props}: ItemProps) {
  return <Link
    className={twMerge("w-full bg-primary-hover hover:bg-primary md:p-1 rounded md:text-base text-lg p-1 px-4", className)} {...props}/>
}

interface BtnProps extends ComponentProps<"button"> {

}

function Btn({className, ...props}: BtnProps) {
  return <button
    className={twMerge("w-full bg-primary-hover hover:bg-primary md:p-1 rounded flex justify-normal items-start md:text-base text-lg p-1 px-4", className)} {...props}/>
}