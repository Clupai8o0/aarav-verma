import {
	HIDDEN_PRODUCT_TAG,
	SHOPIFY_GRAPHQL_API_ENDPOINT,
	TAGS,
} from "./constants";
import { addToCartMutation, createCartMutation, editCartItemsMutation, removeFromCartMutation } from "./mutations";
import { getCartQuery, getProductQuery, getProductsQuery } from "./queries";
import { isShopifyError } from "./type-guards";
import {
	Cart,
	Connection,
	Image,
	Product,
	ShopifyAddToCartOperation,
	ShopifyCart,
	ShopifyCartOperation,
	ShopifyCollectionProductsOperation,
	ShopifyCreateCartOperation,
	ShopifyProduct,
	ShopifyProductOperation,
	ShopifyRemoveFromCartOperation,
	ShopifyUpdateCartOperation,
} from "./types";
import { ensureStartWith } from "./utils";

const domain = process.env.SHOPIFY_STORE_DOMAIN
	? ensureStartWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
	: "";
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
type ExtractVariables<T> = T extends { variables: object }
	? T["variables"]
	: never;

export async function shopifyFetch<T>({
	cache = "force-cache",
	headers,
	query,
	tags,
	variables,
}: {
	cache?: RequestCache;
	headers?: HeadersInit;
	query: string;
	tags?: string[];
	variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
	try {
		const result = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Shopify-Storefront-Access-Token": key,
				...headers,
			},
			body: JSON.stringify({
				...(query && { query }),
				...(variables && { variables }),
			}),
			cache,
			...(tags && { next: { tags } }),
		});

		const body = await result.json();

		if (body.errors) {
			throw body.errors[0];
		}

		return {
			status: result.status,
			body,
		};
	} catch (error) {
		if (isShopifyError(error)) {
			throw {
				cause: error.cause?.toString() || "unknown",
				status: error.status || 500,
				message: error.message,
				query,
			};
		}

		throw {
			error,
			query,
		};
	}
}

function removeEdgesAndNodes<T>(array: Connection<T>): T[] {
	return array.edges.map((edge) => edge?.node);
}
function reshapeImages(images: Connection<Image>, productTitle: string) {
	const flattened = removeEdgesAndNodes(images);

	return flattened.map((image) => {
		const filename = image.url.match(/.*\/(.*)\..*/)?.[1];

		return {
			...image,
			altText: image.altText || `${productTitle} - ${filename}`,
		};
	});
}
function reshapeProduct(
	product: ShopifyProduct,
	filterHiddenProducts: boolean = true
) {
	if (
		!product ||
		(filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
	) {
		return undefined;
	}

	const { images, variants, ...rest } = product;

	return {
		...rest,
		images: reshapeImages(images, product.title),
		variants: removeEdgesAndNodes(variants),
	};
}
function reshapeProducts(products: ShopifyProduct[]) {
	const reshapedProducts = [];

	for (const product of products) {
		if (product) {
			const reshapedProduct = reshapeProduct(product);

			if (reshapedProduct) {
				reshapedProducts.push(reshapedProduct);
			}
		}
	}

	return reshapedProducts;
}

export async function getProducts({
	query,
	reverse,
	sortKey,
}: {
	query?: string;
	reverse?: boolean;
	sortKey?: string;
}): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
		query: getProductsQuery,
		tags: [TAGS.products],
		variables: {
			//@ts-ignore
			query,
			reverse,
			sortKey,
		},
	});

	//@ts-ignore
	return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}
export async function getProduct(handle: string): Promise<Product | undefined> {
	const res = await shopifyFetch<ShopifyProductOperation>({
		query: getProductQuery,
		tags: [TAGS.products],
		variables: {
			handle,
		},
	});
	return reshapeProduct(res.body.data.product, false);
}

function reshapeCart(cart: ShopifyCart): Cart {
	if (!cart.cost?.totalTaxAmount) {
		cart.cost.totalTaxAmount = {
			amount: "0.0",
			currencyCode: "USD",
		};
	}

	return {
		...cart,
		lines: removeEdgesAndNodes(cart.lines),
	};
}
export async function createCart(): Promise<Cart> {
	const res = await shopifyFetch<ShopifyCreateCartOperation>({
		query: createCartMutation,
		cache: "no-store",
	});

	return reshapeCart(res.body.data.cartCreate.cart);
}
export async function getCart(
	cartId: string | undefined
): Promise<Cart | undefined> {
	if (!cartId) return undefined;

	const res = await shopifyFetch<ShopifyCartOperation>({
		query: getCartQuery,
		variables: { cartId },
		tags: [TAGS.cart],
	});

	// old carts becomes 'null' when you checkout
	if (!res.body.data.cart) {
		return undefined;
	}

	return reshapeCart(res.body.data.cart);
}
export async function addToCart(
	cartId: string,
	lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
	const res = await shopifyFetch<ShopifyAddToCartOperation>({
		query: addToCartMutation,
		variables: {
			cartId,
			lines,
		},
		cache: "no-cache",
	});

	return reshapeCart(res.body.data.cartLinesAdd.cart);
}
export async function removeFromCart(
	cartId: string,
	lineIds: string[]
): Promise<Cart> {
	const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
		query: removeFromCartMutation,
		variables: {
			cartId,
			lineIds,
		},
		cache: "no-store",
	});

	return reshapeCart(res.body.data.cartLinesRemove.cart);
}
export async function updateCart(
	cartId: string,
	lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
	const res = await shopifyFetch<ShopifyUpdateCartOperation>({
		query: editCartItemsMutation,
		variables: {
			cartId,
			lines,
		},
		cache: "no-store",
	});

	return reshapeCart(res.body.data.cartLinesUpdate.cart);
}
