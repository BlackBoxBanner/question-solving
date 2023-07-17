"use client"

import {User} from ".prisma/client";
import {twMerge} from "tailwind-merge";
import Link from "next/link";
import {AiFillEdit} from "react-icons/ai";
import {ComponentProps} from "react";

interface CardProps extends ComponentProps<"div"> {
  user: User
}

export function Card({user, ...props}: CardProps) {
  return (
    <>
      <div
        className={twMerge("border border-secondary rounded p-2 relative hover:bg-primary-hover transition-colors duration-150 ease-in-out")}>
        <Link href={`/admin/user/${user.id}`}>
          <p className={"text-xl mb-2"}>{user.name}</p>
          <div className={twMerge("grid grid-cols-2")}>
            <p>Username :</p>
            <p>{user.username}</p>
            <p>Discord ID :</p>
            <p style={{zIndex: 10}} onClick={event => {
              navigator.clipboard.writeText(user.discordId || "")
            }}>{user.discordId}</p>
            <p>Line ID :</p>
            <p style={{zIndex: 10}} onClick={event => {
              navigator.clipboard.writeText(user.lineId || "")
            }}>{user.lineId}</p>
            {props.children}
          </div>
        </Link>
        <Link href={`/admin/user/${user.id}/edit`}
              className={twMerge("absolute top-0 right-0 hover:text-teritary-light")}>
          <AiFillEdit size={25}/>
        </Link>
      </div>
    </>
  )
}