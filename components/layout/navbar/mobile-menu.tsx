"use client";

import { Menu } from "@/lib/shopify/types";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Search from "./search";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function MobileMenu({ menu }: { menu: Menu[] }) {
	const [isOpen, setIsOpen] = useState(false);
	const openMobileMenu = () => setIsOpen(true);
	const closeMobileMenu = () => setIsOpen(false);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<button
					onClick={openMobileMenu}
					aria-label="Open mobile menu"
					className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white"
				>
					<MenuIcon className="h-4" />
				</button>
			</SheetTrigger>

			<SheetContent>
					<div className="p-4">
						<button
							className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
							onClick={closeMobileMenu}
							aria-label="Close mobile menu"
						>
							<XIcon className="h-6" />
						</button>

						<div className="mb-4 w-full">
							<Search />
						</div>

						{menu.length > 0 ? (
							<ul className="flex w-full flex-col">
								{menu.map((item: Menu) => (
									<li
										className="py-2 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white"
										key={item.title}
									>
										<Link
											href={item.path}
											prefetch={true}
											onClick={closeMobileMenu}
										>
											{item.title}
										</Link>
									</li>
								))}
							</ul>
						) : null}
					</div>
			</SheetContent>
		</Sheet>
	);
}
