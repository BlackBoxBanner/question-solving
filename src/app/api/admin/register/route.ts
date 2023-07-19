import {NextResponse} from "next/server";
import {sessionHandle, removeAuth} from "@/utils/session";
import prisma from "@/utils/prisma";

export async function GET(request: Request) {
  const session = await sessionHandle()
  if (!session) return NextResponse.json("user un-auth")
  if (session.data.admin) return NextResponse.json("user already admin")

  await prisma.user.update({
    where: {
      id: session?.data.id
    },
    data: {
      admin: true
    }
  })

  await removeAuth()

  return NextResponse.json("role changed")
}
