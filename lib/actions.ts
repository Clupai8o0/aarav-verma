"use server"

import { cookies } from "next/headers";
import { createCart } from "./shopify";

export async function createCartAndSetCookie() {
	let cart = await createCart();
  //@ts-ignore
	cookies().set("cartId", cart.id!);
}