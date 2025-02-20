import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const serif = EB_Garamond({
	variable: "--font-serif",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Aarav Verma",
	description:
		"To become truly immortal a work of art must escape all human limits: logic and common sense will only interfere. But once these barriers are broken it will enter the regions of childhood vision and dream. The symbols or the figures represent a part of the sophistication and spontaneity of my mind. The work creates a harmony of both aesthetic and complexity of lines to bring out a face that is eerie yet familiar in our daily lives, depicting the reality of the human society",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${serif.variable} antialiased`}>{children}</body>
		</html>
	);
}
