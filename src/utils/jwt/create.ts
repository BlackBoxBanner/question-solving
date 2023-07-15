import * as jose from 'jose';

export const GetAuthJWT = {
  secret: () => {
    const secretEnv = process.env.SECRET_JWT
    if (!secretEnv) throw new Error("SECRET_JWT missing in .env file.")
    return new TextEncoder().encode(secretEnv)
  },
  url: () => {
    const urlEnv = process.env.NEXTAUTH_URL
    if (!urlEnv) throw new Error("NEXTAUTH_URL missing in .env file.")
    return urlEnv
  },
  setProtectedHeader: {
    alg: "HS256",
    typ: "JWT"
  },
  issue: new Date().getDate(),
  exp: "30d",
}

export async function createJWT<T = Record<string, string>>(props: ({ id: string, subject: string, payload?: T })) {
  if (typeof props != "object") throw new Error("props in createJWT function must be 'props : Record<string, string>' ")

  return new jose.SignJWT({data: props.payload})
    .setProtectedHeader(GetAuthJWT.setProtectedHeader)
    .setIssuedAt(GetAuthJWT.issue)
    .setIssuer(GetAuthJWT.url())
    .setAudience(props.id)
    .setExpirationTime(GetAuthJWT.exp)
    .setSubject(props.subject)
    .sign(GetAuthJWT.secret())
}
