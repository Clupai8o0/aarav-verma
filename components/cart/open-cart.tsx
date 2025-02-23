import { ShoppingCartIcon } from "lucide-react";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
		<div className="relative flex items-center justify-center">
			<img
				src="/cart.png"
				alt="Cart"
				className="w-6 h-6 md:w-9 md:h-9 cursor-pointer"
			/>

			{quantity ? (
				<div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue- text-[11px] font-medium text-black font-sans">
					{quantity}
				</div>
			) : null}
		</div>
	);
}
