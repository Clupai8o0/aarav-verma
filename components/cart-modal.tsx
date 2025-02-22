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
import { createCartAndSetCookie } from "@/lib/actions";

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
			</SheetContent>
		</Sheet>
	);
};

export default CartModal;
