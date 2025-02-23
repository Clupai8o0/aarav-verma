"use client"

import LiquidChrome from "@/components/liquid-chrome";
import Link from "next/link";

function NotFound() {
	return (
		<div className="w-full h-dvh relative">
			<LiquidChrome
				baseColor={[0.1, 0.1, 0.1]}
				interactive={true}
				amplitude={0.6}
				speed={1}
			/>
			<div className="absolute w-full h-full top-0 left-0 flex flex-col gap-4 items-center justify-center">
				<h1 className="font-sans text-4xl font-bold">Oops! Page Not Found...</h1>
				<Link href="/" className="font-sans text-muted-foreground hover:text-primary">
					Go back to home
				</Link>
			</div>
		</div>
	);
}

export default NotFound;
