import "../globals.css";
import { Inter, Outfit } from "next/font/google";
import React from "react";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

const outfit = Outfit({
	weight: "400",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Dashboard",
	description: "user user",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={twMerge(
					"bg-primary text-secondary h-screen flex relative",
					outfit.className
				)}
			>
				<div className={twMerge("overflow-y-auto p-8")}>{children}</div>
			</body>
		</html>
	);
}
