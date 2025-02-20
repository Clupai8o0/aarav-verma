import Bounded from "@/components/bounded";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<main>
			<Bounded>
				<header className="flex justify-between items-center py-8 w-full">
					<Link href="/">
						<img
							src="/logo.png"
							alt="Aarav Verma handwriting logo"
							className="w-auto h-16"
						/>
					</Link>

					<div>
						<ShoppingBag size={36} strokeWidth={1} />
					</div>
				</header>
			</Bounded>
		</main>
	);
}
