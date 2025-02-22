import type { Metadata } from "next";
import { EB_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { CartProvider } from "@/components/cart-context";
import { cookies } from "next/headers";
import { getCart } from "@/lib/shopify";

const serif = EB_Garamond({
	variable: "--font-serif",
	subsets: ["latin"],
});

const sans = Montserrat({
	weight: ["400", "700"],
	variable: "--font-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Aarav Verma",
	description:
		"Welcome to Aarav Verma, where art, fashion, and storytelling converge. Our debut collection, LOREM IPSUM, features uniquely designed tote bags, wall art, and t-shirts that celebrate the essence of human expression. Each piece is meticulously handcrafted, blending contemporary aesthetics with deep philosophical undertones.",
};

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const cartId = (await cookies()).get("cartId")?.value;
	const cartPromise = getCart(cartId);

	return (
		<html lang="en">
			<body className={`${serif.variable} ${sans.variable} antialiased`}>
				<CartProvider cartPromise={cartPromise}>
					<Navbar />
					{children}
				</CartProvider>
			</body>
		</html>
	);
}
