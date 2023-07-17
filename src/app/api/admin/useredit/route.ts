import {NextResponse} from "next/server";
import prisma from "@/utils/prisma";

interface Body {
  id: string,
  name: string,
  username: string,
  discordId: string,
  lineId: string,
}

export async function POST(request: Request) {
  const requestHeaders = new Headers(request.headers);
  const auth = requestHeaders.get("Authorization");

  try {
    const json = (await request.json()) as Body;

    const result = await PostHandler(json);

    return new NextResponse(JSON.stringify(result), {
      status: 201,
      headers: {"Content-Type": "application/json"},
    });
  } catch (error: any) {
    // Handle error
    if (error.code === "P2002") {
      let error_response = {
        status: "fail",
        message: "Feedback with title already exists",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 409,
        headers: {"Content-Type": "application/json"},
      });
    }

    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: {"Content-Type": "application/json"},
    });
  }
}

type PostHandlerReturnType<T = any> =
  | (Record<string, any> | T)
  | undefined
  | null;

async function PostHandler(data: Body): Promise<PostHandlerReturnType<any>> {
  const {id, name, lineId, discordId, username} = data;
  const newUser = await prisma.user.update({
    where: {
      id
    },
    data: {
      name,
      username,
      discordId,
      lineId,
    }
  })


}
