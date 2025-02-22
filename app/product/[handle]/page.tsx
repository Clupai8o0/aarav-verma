import Bounded from "@/components/bounded";
import Gallery from "@/gallery";
import { getProduct } from "@/lib/shopify";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

//todo: generate metadata

async function Product({ params }: { params: { handle: string } }) {
	const { handle } = await params;
	const product = await getProduct(handle);
	if (!product) return notFound();

	return (
		<main className="px-4 md:px-10 lg:px-0">
			<Bounded>
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
			</Bounded>

			<Bounded>
				<div className="flex flex-row items-center">
					<div className="w-full lg:w-1/2 flex justify-center mt-12">
						<Gallery images={product.images} />
					</div>
					<div className="w-full lg:w-1/2">
						<h1>{product.title}</h1>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
							aliquid sint qui tenetur cum aperiam veniam, ad magni! Repellat
							aspernatur dolore non animi voluptatibus voluptas illo modi soluta
							ipsa odio.
						</p>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							Delectus, quas molestias accusantium nulla iste praesentium facere
							commodi. Dignissimos, provident explicabo doloremque aperiam,
							nobis consectetur corporis officia, dicta facere vel vero!
						</p>
						<button>Add to cart</button>
					</div>
				</div>
			</Bounded>
		</main>
	);
}

export default Product;
