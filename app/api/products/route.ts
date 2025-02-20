import { getProducts } from "@/lib/shopify";

export async function GET(req: Request) {
	const products = await getProducts({});
	return Response.json(products);
}
