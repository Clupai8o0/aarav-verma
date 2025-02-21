import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import Bounded from "@/components/bounded";
import { generateKey } from "@/lib/utils";
import { getProducts } from "@/lib/shopify";

export default async function Home() {
	const products = await getProducts({});

	return (
		<main className="px-4 md:px-10 lg:px-0">
			<Bounded
				outerChildren={
					<img
						src="/bg.png"
						className="absolute opacity-10 w-2/3 lg:w-1/2 right-0 top-12 lg:top-24"
					/>
				}
				id="hero"
			>
				<header className="flex justify-between items-center py-8 w-full">
					<Link href="/">
						<img
							src="/logo.png"
							alt="Aarav Verma handwriting logo"
							className="w-auto h-10 md:h-16"
						/>
					</Link>

					<div>
						<ShoppingBag className="w-6 h-6 md:w-9 md:h-9" strokeWidth={1} />
					</div>
				</header>

				<div className="flex w-full items-end justify-center gap-4">
					<img src="/lorem.png" alt="Lorem handwritten" className="w-1/2" />
					<img src="/ipsum.png" alt="Ipsum handwritten" className="w-1/2" />
				</div>
			</Bounded>

			<Bounded id="products" className="mt-10">
				<h1 className="text-center text-7xl mb-8">Products</h1>
				<div className="grid grid-cols-4 gap-x-6 gap-y-10">
					{products.slice(0, 4).map((product) => (
						// {products.map((product) => (
						<Link href={`/product/${product.handle}`} key={generateKey()}>
							<div>
								<img
									src={product.images[0].url}
									alt={product.images[0].altText}
									className="w-full object-cover h-96"
								/>
								<div className="flex justify-between items-center mt-4 text-lg">
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
