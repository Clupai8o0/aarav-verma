import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import Bounded from "@/components/bounded";
import { generateKey } from "@/lib/utils";

const dummyData = [
	{
		title: "Product 1",
		src: "/img.jpg",
		price: 100,
	},
	{
		title: "Product 2",
		src: "/img.jpg",
		price: 100,
	},
	{
		title: "Product 3",
		src: "/img.jpg",
		price: 100,
	},
	{
		title: "Product 4",
		src: "/img.jpg",
		price: 100,
	},
];

export default function Home() {
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

				<div className="flex w-full items-end justify-center">
					<img src="/lorem.png" alt="Lorem handwritten" className="w-1/2" />
					<img src="/ipsum.png" alt="Ipsum handwritten" className="w-1/2" />
				</div>
			</Bounded>

			<Bounded id="products" className="mt-10">
				<h1 className="text-center text-7xl mb-8">Products</h1>
				<div className="flex gap-4">
					{dummyData.map((product) => (
						<div key={generateKey()}>
							<img src={product.src} alt={product.title} />
							<div className="flex justify-between items-center mt-4 text-lg">
								<h2>{product.title}</h2>
								<p>{product.price}</p>
							</div>
						</div>
					))}
				</div>
			</Bounded>
		</main>
	);
}
