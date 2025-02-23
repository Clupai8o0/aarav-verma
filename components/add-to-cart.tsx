"use client";

import { Product, ProductVariant } from "@/lib/types";
import { useCart } from "./cart-context";
import { useProduct } from "./product-context";
import { useActionState } from "react";
import { addItem } from "@/lib/actions";

function SubmitButton() {
	return (
		<button aria-label="Please select an option" className="">
			Add To Cart
		</button>
	);
}

export function AddToCart({ product }: { product: Product }) {
	const { variants, availableForSale } = product;
	const { addCartItem } = useCart();
	const { state } = useProduct();
	const [message, formAction] = useActionState(addItem, null);
	const variant = variants.find((variant: ProductVariant) =>
		variant.selectedOptions.every(
			(option) => option.value === state[option.name.toLowerCase()]
		)
	);
	const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
	const selectedVariantId = variant?.id || defaultVariantId;
	const actionWithVariant = formAction.bind(null, selectedVariantId);
	const finalVariant = variants.find(
		(variant) => variant.id === selectedVariantId
	)!;

	return (
		<form
			action={async () => {
				addCartItem(finalVariant, product);
				await actionWithVariant();
			}}
		>
			<SubmitButton />
			<p className="sr-only" role="status" aria-label="polite">
				{message}
			</p>
		</form>
	);
}
