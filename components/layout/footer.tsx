import Link from "next/link";
import React from "react";
import Bounded from "./bounded";

function Footer() {
	return (
		<footer className="w-full border-t border-border/50 py-6 px">
			<Bounded className="!flex-row justify-between items-center">
				<p className="font-sans text-sm text-muted-foreground">
					&copy; {new Date().getFullYear()} Aarav Verma. All rights reserved.
				</p>

				<div className="flex items-center gap-4">
					<Link
						href="/"
						className="font-sans text-sm text-muted-foreground hover:text-primary"
					>
						Home
					</Link>
					<Link
						href="/contact"
						className="font-sans text-sm text-muted-foreground hover:text-primary"
					>
						Contact
					</Link>
				</div>
			</Bounded>
		</footer>
	);
}

export default Footer;
