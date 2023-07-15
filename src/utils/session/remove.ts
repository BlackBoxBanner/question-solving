import {cookies} from "next/headers";

export default async function removeAuth() {
  await cookies().delete("auth-service")
}
