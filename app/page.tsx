import Bounded from "@/components/layout/bounded";
import Products from "@/components/product/products";
import Link from "next/link";

export default function Home() {
  return (
    <main className="px mb-12">
      <Bounded
				outerChildren={
					<img
						src="/bg.png"
						className="absolute opacity-10 w-2/3 lg:w-1/2 right-0 top-12 lg:top-24"
					/>
				}
				id="hero"
			>
				<div className="flex w-full items-end justify-center gap-4">
					<img
						src="/lorem.png"
						alt="Lorem handwritten"
						className="w-1/2 md:w-1/4"
					/>
					<img
						src="/ipsum.png"
						alt="Ipsum handwritten"
						className="w-1/2 md:w-1/4"
					/>
				</div>
			</Bounded>

      <Products />
    </main>
  );
}
