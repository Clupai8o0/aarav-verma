import React from "react";
import Bounded from "./bounded";
import Link from "next/link";
import { generateKey } from "@/lib/utils";
import Price from "./price";
import { getProducts } from "@/lib/shopify";

async function Products() {
	const products = await getProducts({});

	return (
		<Bounded id="products" className="mt-10">
			<img
				src="/products.png"
				alt="Products"
				className="w-1/4 md:w-1/6 mx-auto mb-8"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
				{products.map((product) => (
					// {products.map((product) => (
					<Link href={`/product/${product.handle}`} key={generateKey()}>
						<div>
							<img
								src={product.images[0].url}
								alt={product.images[0].altText}
								className="w-full object-contain md:object-cover md:h-[450px] lg:h-[350px] xl:h-[400px]"
							/>
							<div className="flex justify-between items-center mt-4 text-base">
								<h2 className="font-sans truncate">{product.title}</h2>
								<Price
									className="font-sans"
									currencyCodeClassName="font-sans"
									amount={product.priceRange.maxVariantPrice.amount}
									currencyCode={product.priceRange.maxVariantPrice.currencyCode}
								/>
							</div>
						</div>
					</Link>
				))}
			</div>
		</Bounded>
	);
}

export default Products;
