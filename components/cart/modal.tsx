"use client";

import { ShoppingCartIcon } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useCart } from "./cart-context";
import { createUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Price from "../price";
import OpenCart from "./open-cart";
import CloseCart from "./close-cart";
import { DEFAULT_OPTION } from "@/lib/constants";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import { useFormStatus } from "react-dom";
import LoadingDots from "../loading-dots";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";

type MerchandiseSearchParams = {
	[key: string]: string;
};

export default function CartModal() {
	const { cart, updateCartItem } = useCart();
	const [isOpen, setIsOpen] = useState(false);
	const quantityRef = useRef(cart?.totalQuantity);
	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	useEffect(() => {
		if (!cart) {
			createCartAndSetCookie();
		}
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
			<SheetContent className="w-full max-w-[500px]">
				<SheetHeader>
					<SheetTitle className="font-sans font-light">Cart</SheetTitle>
				</SheetHeader>

				{!cart || cart.lines.length === 0 ? (
					<div className="h-[70vh] flex items-center justify-center">
						<p className="mt-6 text-center text-2xl font-medium text-muted-foreground font-sans">
							Your Cart is Empty.
						</p>
					</div>
				) : (
					<div className="flex h-full flex-col justify-between overflow-hidden p-1">
						<ul className="flex-grow overflow-auto py-4">
							{cart.lines
								.sort((a, b) =>
									a.merchandise.product.title.localeCompare(
										b.merchandise.product.title
									)
								)
								.map((item, i) => {
									const merchandiseSearchParams = {} as MerchandiseSearchParams;

									item.merchandise.selectedOptions.forEach(
										({ name, value }) => {
											if (value !== DEFAULT_OPTION) {
												merchandiseSearchParams[name.toLocaleLowerCase()] =
													value;
											}
										}
									);
									const merchandiseUrl = createUrl(
										`/product/${item.merchandise.product.handle}`,
										new URLSearchParams(merchandiseSearchParams)
									);

									return (
										<li
											key={i}
											className="flex w-full flex-row items-center justify-between border-b py-4 border-neutral-700 gap-2"
										>
											{/* <div className="relative flex w-full flex-row justify-between px-1 py-4">
												<DeleteItemButton
													item={item}
													optimisticUpdate={updateCartItem}
												/>
											</div> */}

											<div className="flex flex-row">
												<div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-700 bg-neutral-900 hover:bg-neutral-800">
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
													<div className="flex flex-1 flex-col text-base justify-center items-start gap-1">
														<span className="leading-tight truncate">
															{item.merchandise.product.title}
														</span>
														{item.merchandise.title !== DEFAULT_OPTION ? (
															<p className="text-sm text-neutral-500 dark:text-neutral-400">
																{item.merchandise.title}
															</p>
														) : null}
														<Price
															className="flex justify-end space-y-2 text-right text-sm text-muted-foreground"
															amount={item.cost.totalAmount.amount}
															currencyCode={item.cost.totalAmount.currencyCode}
														/>
													</div>
												</Link>
											</div>

											<div className="flex flex-col justify-between">
												<div className="ml-auto flex h-9 flex-row items-center">
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
						<div className="py-4 text-sm text-neutral-400">
							<div className="mb-3 flex items-center justify-between border-b pb-1 pt-1 border-neutral-700">
								<p>Total</p>
								<Price
									className="text-right text-base text-white"
									amount={cart.cost.totalAmount.amount}
									currencyCode={cart.cost.totalAmount.currencyCode}
								/>
							</div>
						</div>
						<form
							action={() => {
								redirectToCheckout();
							}}
							className="pb-8"
						>
							<CheckoutButton />
						</form>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}

function CheckoutButton() {
	const { pending } = useFormStatus();

	return (
		<button
			className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
			type="submit"
			disabled={pending}
		>
			{pending ? <LoadingDots className="bg-white" /> : "Proceed to Checkout"}
		</button>
	);
}
