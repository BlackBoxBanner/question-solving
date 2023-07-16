import {compare, hash} from "bcrypt";
import {cookies} from "next/headers";
import prisma from "./../prisma";
import {createJWT} from "./../jwt";
import {AuthValidation} from "./authValidation";

export default async function createAuth({
                                           username,
                                           password,
                                           name,
                                           discordId,
                                           lineId,
                                         }: {
  name: string;
  username: string;
  password: string;
  discordId: string;
  lineId: string;
}) {
  const userList = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  const nameList = await prisma.user.findFirst({
    where: {
      name,
    },
  });

  if (userList) {
    throw new Error(
      JSON.stringify({name: "username", message: "user already exists"})
    );
  }

  if (nameList) {
    throw new Error(
      JSON.stringify({name: "name", message: "name already exists"})
    );
  }

  if (!name) {
    throw new Error(JSON.stringify({name: "name", message: "Invalied name"}));
  }

  if (!username) {
    throw new Error(
      JSON.stringify({name: "username", message: "Invalied username"})
    );
  }

  if (!password) {
    throw new Error(
      JSON.stringify({name: "password", message: "Invalied password"})
    );
  }

  const user = await prisma.user.create({
    data: {
      name,
      password: await hash(password, 10),
      username,
      lineId,
      discordId,
    },
  });

  const jwt = await createJWT({
    id: user.id,
    subject: "auth-service",
    payload: {
      id: user.id,
      username: user.username,
      name: user.name,
      admin: user.admin,
    },
  });

  // Handle cookie
  const cookieAuth = cookies().get("auth-service");

  await AuthValidation({id: user.id, cookieAuth});

  await cookies().set({
    name: "auth-service",
    value: jwt,
    expires: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    path: "/",
    priority: "high",
  });

  return user;
}
