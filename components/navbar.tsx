import Link from "next/link";
import CartModal from "./cart-modal";
import Bounded from "./bounded";

const Navbar = () => {
	return (
		<Bounded className="px">
			<header className="flex justify-between items-center py-8 w-full">
				<Link href="/">
					<img
						src="/logo.png"
						alt="Aarav Verma handwriting logo"
						className="w-auto h-10 md:h-16"
					/>
				</Link>

				<CartModal />
			</header>
		</Bounded>
	);
};

export default Navbar;
