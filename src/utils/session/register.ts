import { compare } from "bcrypt";
import { cookies } from "next/headers";
import prisma from "./../prisma";
import { createJWT } from "./../jwt";
import { AuthValidation } from "./authValidation";

export default async function registerAuth({
	username,
	password,
}: {
	username: string;
	password: string;
}) {
	const user = await prisma.user.findUnique({
		where: {
			username,
		},
		select: {
			id: true,
			username: true,
			name: true,
			password: true,
		},
	});

	if (!user)
		throw new Error(
			JSON.stringify({ name: "username", message: "Invalid user" })
		);

	if (user.password) {
		if (!(user && (await compare(password, user.password)))) {
			// if user doesn't exist or password doesn't match
			throw new Error(
				JSON.stringify({ name: "password", message: "Invalid password" })
			);
		}
	}

	const jwt = await createJWT({
		id: user.id,
		subject: "api-service",
		payload: {
			id: user.id,
			username: user.username,
			name: user.name,
		},
	});

	// Handle cookie
	const cookieAuth = cookies().get("api-service");

	await AuthValidation({ id: user.id, cookieAuth });

	await cookies().set({
		name: "auth-service",
		value: jwt,
		expires: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
		path: "/",
		priority: "high",
	});

	prisma.$disconnect();
	
	return user;
}
