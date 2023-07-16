"use client"

import {ComponentProps} from "react";
import {Session} from "@/utils/session/types";
import {useRouter} from "next/navigation";

interface SessionHandlerProps extends ComponentProps<"div"> {
  session?: Session
}

export function SessionHandler(props: SessionHandlerProps) {
  const router = useRouter()
  if (!props.session?.data.admin) router.push("/")
  return <></>
}