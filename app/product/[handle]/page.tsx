import Bounded from "@/components/bounded";
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
				<div></div>
				<div></div>
			</Bounded>
		</main>
	);
}

export default Product;
