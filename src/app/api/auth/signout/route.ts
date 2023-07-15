import { NextResponse } from "next/server";

import { removeAuth } from "@/utils/session";

interface Body {}

interface PostReturn {
	status: "ok" | "error";
	item?: string;
	message: string;
	data?: any;
}

export async function POST(request: Request) {
	const requestHeaders = new Headers(request.headers);
	const auth = requestHeaders.get("Authorization");

	const header = request.headers;
	const baseUrl = header.get("origin");

	try {
		const result = await PostHandler();

		return new NextResponse(JSON.stringify(result), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error: any) {
		// Handle error
		console.log(error);

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

async function PostHandler(): Promise<PostHandlerReturnType<any>> {
	return removeAuth();
}
