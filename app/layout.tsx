import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Montserrat } from "next/font/google";

import "./globals.css";
import { getCart } from "@/lib/shopify";

import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CartProvider } from "@/components/cart/cart-context";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cartId = (await cookies()).get("cartId")?.value;
  const cart = getCart(cartId);

  return (
    <html lang="en">
      <body className={`${sans.variable} antialiased`}>
        <CartProvider cartPromise={cart}>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
