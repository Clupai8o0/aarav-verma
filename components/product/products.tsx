import React from "react";
import Link from "next/link";
import { generateKey } from "@/lib/utils";
import { getProducts, getCollectionProducts } from "@/lib/shopify";
import Price from "../price";
import Bounded from "../layout/bounded";
import { defaultSort, sorting } from "@/lib/constants";

async function Products() {
	// const products = await getProducts({});

	// const { sortKey, reverse } =
	// 	sorting.find((item) => item.slug === sort) || defaultSort;
	const wallArts = await getCollectionProducts({ collection: "wall-arts" });
	const toteBags = await getCollectionProducts({ collection: "tote-bags" });
	const tShirts = await getCollectionProducts({ collection: "t-shirts" });

	return (
		<Bounded id="products" className="mt-10">
			{/* <img
				src="/products.png"
				alt="Products"
				className="w-1/4 md:w-1/5 mx-auto mb-8"
			/> */}
			<div className="flex flex-col gap-12">
				<div>
					<img
						src="/wall-arts.png"
						alt="Wall Arts"
						className="w-1/4 md:w-1/5 mx-auto mb-8"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
						{wallArts.map((product) => (
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
											currencyCode={
												product.priceRange.maxVariantPrice.currencyCode
											}
										/>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
				<div>
					<img
						src="/tote-bags.png"
						alt="Tote Bags"
						className="w-1/4 md:w-1/5 mx-auto mb-8"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
						{toteBags.map((product) => (
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
											currencyCode={
												product.priceRange.maxVariantPrice.currencyCode
											}
										/>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
				<div>
					<img
						src="/prints.png"
						alt="T-Shirts"
						className="w-1/4 md:w-1/5 mx-auto mb-8"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
						{tShirts.map((product) => (
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
											currencyCode={
												product.priceRange.maxVariantPrice.currencyCode
											}
										/>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</Bounded>
	);
}

export default Products;
