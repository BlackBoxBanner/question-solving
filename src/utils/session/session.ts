import { cookies } from "next/headers";
import * as jose from "jose";
import { GetAuthJWT } from "../jwt";
import { Session } from "../session/types";

export default async function sessionHandle() {
	const sessionCookie = await cookies().get("auth-service");
	if (!sessionCookie) return sessionCookie;

	try {
		const sessionVerify = await jose.jwtVerify(
			sessionCookie.value,
			GetAuthJWT.secret
		);
		const session: Session = {
			data: sessionVerify.payload.data as Session["data"],
			exp: sessionVerify.payload.exp,
		};

		return session;
	} catch (err) {
		return undefined;
	}
}
