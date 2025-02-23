import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import Bounded from "@/components/bounded";
import { generateKey } from "@/lib/utils";
import { getProducts } from "@/lib/shopify";
import CartModal from "@/components/cart-modal";

export default async function Home() {
	const products = await getProducts({});

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
					<img src="/lorem.png" alt="Lorem handwritten" className="w-1/2 md:w-1/4" />
					<img src="/ipsum.png" alt="Ipsum handwritten" className="w-1/2 md:w-1/4" />
				</div>
			</Bounded>

			<Bounded id="products" className="mt-10">
				<img src="/products.png" alt="Products" className="w-1/4 md:w-1/6 mx-auto mb-8" />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
					{products.map((product) => (
						// {products.map((product) => (
						<Link href={`/product/${product.handle}`} key={generateKey()}>
							<div>
								<img
									src={product.images[0].url}
									alt={product.images[0].altText}
									className="w-full object-contain md:object-cover md:h-[500px] lg:h-[400px]"
								/>
								<div className="flex justify-between items-center mt-4 text-base">
									<h2 className="font-sans">{product.title}</h2>
									<p className="font-sans">
										$A
										{product.priceRange.minVariantPrice.amount
											.toString()
											.slice(0, -2)}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</Bounded>
		</main>
	);
}
