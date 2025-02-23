import { GridTileImage } from "@/components/grid/tile";
import Bounded from "@/components/layout/bounded";
import Gallery from "@/components/product/gallery";
import { ProductProvider } from "@/components/product/product-context";
import { ProductDescription } from "@/components/product/product-description";
import Products from "@/components/product/products";
import { HIDDEN_PRODUCT_TAG } from "@/lib/constants";
import { getProduct, getProductRecommendations } from "@/lib/shopify";
import { Image } from "@/lib/shopify/types";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ handle: string }>;
}): Promise<Metadata> {
	const { handle } = await params;
	const product = await getProduct(handle);

	if (!product) return notFound();

	const { url, width, height, altText: alt } = product.featuredImage || {};
	const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

	return {
		title: product.seo.title || product.title,
		description: product.seo.description || product.description,
		robots: {
			index: indexable,
			follow: indexable,
			googleBot: {
				index: indexable,
				follow: indexable,
			},
		},
		openGraph: url
			? {
					images: [
						{
							url,
							width,
							height,
							alt,
						},
					],
			  }
			: null,
	};
}

export default async function ProductPage({
	params,
}: {
	params: Promise<{ handle: string }>;
}) {
	const { handle } = await params;
	const product = await getProduct(handle);
	if (!product) return notFound();
	return (
		<ProductProvider>
			<Bounded className="px mb-12">
				<div className="flex flex-col rounded-lg p-8 md:p-12 lg:flex-row items-center lg:gap-8 bg-black mb-8">
					<div className="h-full w-full basis-full lg:basis-1/2">
						<Suspense
							fallback={
								<div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
							}
						>
							<Gallery
								images={product.images.slice(0, 5).map((image: Image) => ({
									src: image.url,
									altText: image.altText,
								}))}
							/>
						</Suspense>
					</div>

					<div className="basis-full lg:basis-1/2">
						<Suspense fallback={null}>
							<ProductDescription product={product} />
						</Suspense>
					</div>
				</div>

				<Products />
			</Bounded>
		</ProductProvider>
	);
}
