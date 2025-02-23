"use client";

import React, { useEffect, useRef, useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";
import { useCart } from "./cart-context";
import { createCartAndSetCookie, redirectToCheckout } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { DEFAULT_OPTION } from "@/lib/constants";
import { createUrl } from "@/lib/utils";
import Price from "./price";
import { EditItemQuantityButton } from "./edit-cart-item";
import { DeleteItemButton } from "./delete-cart-item";
import { useFormStatus } from "react-dom";

import { Loader2 } from "lucide-react";

type MerchandiseSearchParams = {
	[key: string]: string;
};

const CartModal = () => {
	const { cart, updateCartItem } = useCart();
	const [isOpen, setIsOpen] = useState(false);
	const quantityRef = useRef(cart?.totalQuantity);
	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	useEffect(() => {
		if (!cart) createCartAndSetCookie();
	}, [cart]);

	useEffect(() => {
		if (
			cart?.totalQuantity &&
			cart?.totalQuantity !== quantityRef.current &&
			cart?.totalQuantity > 0
		) {
			if (!isOpen) {
				setIsOpen(true);
			}

			quantityRef.current = cart?.totalQuantity;
		}
	}, [isOpen, cart?.totalQuantity, quantityRef]);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<div className="relative">
					<img
						src="/cart.png"
						alt="Cart"
						className="w-6 h-6 md:w-9 md:h-9 cursor-pointer"
					/>

					{(cart?.totalQuantity && (
						<div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded-full bg-white text-[11px] text-black flex items-center justify-center font-sans">
							{cart?.totalQuantity}
						</div>
					)) ||
						null}
				</div>
			</SheetTrigger>

			<SheetContent>
				<SheetHeader>
					<SheetTitle className="font-sans font-light">Cart</SheetTitle>
				</SheetHeader>

				{!cart || cart.lines.length === 0 ? (
					<div className="flex flex-col gap-4 h-dvh justify-center items-center">
						<p className="font-sans text-2xl text-muted-foreground">Your cart is empty</p>
					</div>
				) : (
					<div className="flex h-full flex-col justify-between overflow-hidden p-1">
						<ul className="flex-row overflow-auto py-4">
							{cart.lines.map((item, i) => {
								const merchandiseSearchParams = {} as MerchandiseSearchParams;

								item.merchandise.selectedOptions.forEach(({ name, value }) => {
									if (value !== DEFAULT_OPTION) {
										merchandiseSearchParams[name.toLocaleLowerCase()] = value;
									}
								});
								const merchandiseUrl = createUrl(
									`/product/${item.merchandise.product.handle}`,
									new URLSearchParams(merchandiseSearchParams)
								);
								return (
									<li
										key={i}
										className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
									>
										<div className="relative flex w-full flex-row justify-between px-1 py-4">
											<DeleteItemButton
												item={item}
												optimisticUpdate={updateCartItem}
											/>
										</div>
										<div className="flex flex-row">
											<div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
												<Image
													className="h-full w-full object-cover"
													width={64}
													height={64}
													alt={
														item.merchandise.product.featuredImage.altText ||
														item.merchandise.product.title
													}
													src={item.merchandise.product.featuredImage.url}
												/>
											</div>
											<Link
												href={merchandiseUrl}
												onClick={closeCart}
												className="z-30 ml-2 flex flex-row space-x-4"
											>
												<div className="flex flex-1 flex-col text-base">
													<span className="leading-tight">
														{item.merchandise.product.title}
													</span>
													{item.merchandise.title !== DEFAULT_OPTION ? (
														<p className="text-sm text-neutral-500 dark:text-neutral-400">
															{item.merchandise.title}
														</p>
													) : null}
												</div>
											</Link>
										</div>
										<div className="flex h-16 flex-col justify-between">
											<Price
												className="flex justify-end space-y-2 text-right text-sm"
												amount={item.cost.totalAmount.amount}
												currencyCode={item.cost.totalAmount.currencyCode}
											/>
											<div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
												<EditItemQuantityButton
													item={item}
													type="minus"
													optimisticUpdate={updateCartItem}
												/>
												<p className="w-6 text-center">
													<span className="w-full text-sm">
														{item.quantity}
													</span>
												</p>
												<EditItemQuantityButton
													item={item}
													type="plus"
													optimisticUpdate={updateCartItem}
												/>
											</div>
										</div>
									</li>
								);
							})}
						</ul>
						<div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
							<div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
								<p>Taxes</p>
								<Price
									className="text-right text-base text-black dark:text-white"
									amount={cart.cost.totalTaxAmount.amount}
									currencyCode={cart.cost.totalTaxAmount.currencyCode}
								/>
							</div>
							<div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
								<p>Shipping</p>
								<p className="text-right">Calculated at checkout</p>
							</div>
							<div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
								<p>Total</p>
								<Price
									className="text-right text-base text-black dark:text-white"
									amount={cart.cost.totalAmount.amount}
									currencyCode={cart.cost.totalAmount.currencyCode}
								/>
							</div>
						</div>
						<form
							action={() => {
								redirectToCheckout();
							}}
						>
							<CheckoutButton />
						</form>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
};

function CheckoutButton() {
	const { pending } = useFormStatus();

	return (
		<button
			className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
			type="submit"
			disabled={pending}
		>
			{pending ? <Loader2 className="animate-spin" /> : "Proceed to Checkout"}
		</button>
	);
}

export default CartModal;
