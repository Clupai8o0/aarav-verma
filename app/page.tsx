import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import Bounded from "@/components/bounded";
import { generateKey } from "@/lib/utils";
import { getProducts } from "@/lib/shopify";
import CartModal from "@/components/cart-modal";
import Price from "@/components/price";
import Products from "@/components/products";

export default async function Home() {

	return (
		<main className="px mb-12">
			<Bounded
				outerChildren={
					<img
						src="/bg.png"
						className="absolute opacity-10 w-2/3 lg:w-1/2 right-0 top-12 lg:top-24"
					/>
				}
				id="hero"
			>
				<div className="flex w-full items-end justify-center gap-4">
					<img
						src="/lorem.png"
						alt="Lorem handwritten"
						className="w-1/2 md:w-1/4"
					/>
					<img
						src="/ipsum.png"
						alt="Ipsum handwritten"
						className="w-1/2 md:w-1/4"
					/>
				</div>
			</Bounded>

			<Products />
		</main>
	);
}
