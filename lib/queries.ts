import { cartFragment, productFragment } from "./fragments";

export const getProductQuery = /* GraphQL */ `
	query getProduct($handle: String!) {
		product(handle: $handle) {
			...product
		}
	}
	${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
	query getProducts(
		$sortKey: ProductSortKeys
		$reverse: Boolean
		$query: String
	) {
		products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
			edges {
				node {
					...product
				}
			}
		}
	}
	${productFragment}
`;

export const getCartQuery = /* GraphQL */ `
	query getCart($cartId: ID!) {
		cart(id: $cartId) {
			...cart
		}
	}
	${cartFragment}
`;