import { NextResponse } from "next/server";

import { createAuth } from "@/utils/session";

//TODO -

interface Body {
	name: string;
	username: string;
	password: string;
	confirmPassword: string;
	discordId: string;
	lineId: string;
}

interface PostReturn {
	status: "ok" | "error";
	item?: string;
	message: string;
	data?: any;
}

export async function POST(request: Request) {
	const requestHeaders = new Headers(request.headers);

	try {
		const json = (await request.json()) as Body;

		const result = await PostHandler(json);
		return new NextResponse(JSON.stringify(result), {
			status: 201,
			headers: { "Content-Type": "application/json" },
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
				headers: { "Content-Type": "application/json" },
			});
		}

		let error_response = {
			status: "error",
			message: error.message,
		};
		return new NextResponse(JSON.stringify(error_response), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}

type PostHandlerReturnType<T = any> =
	| (Record<string, any> | T)
	| undefined
	| null;

async function PostHandler(data: Body): Promise<PostHandlerReturnType<any>> {
	// const { username, password, discordId, lineId, confirmPassword, name } = data;

	return createAuth(data);
}
