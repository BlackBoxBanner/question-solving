import {Session} from "./../session/types";
import {cookies} from "next/headers";
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";
import * as jose from 'jose';
import {GetAuthJWT} from "./../jwt";

interface AuthValidationProps {
  cookieAuth: RequestCookie | undefined
  id: string
}

export async function AuthValidation(props: AuthValidationProps) {
  const {cookieAuth, id} = props
  if (cookieAuth) {
    const verify = await jose.jwtVerify(cookieAuth.value, GetAuthJWT.secret)
    const data = verify.payload.data as Session["data"]
    if (data.id !== id) ErrorAuth()
    await cookies().delete("auth-service")
  }
}

function ErrorAuth() {
  throw new Error("User authenticated")
}