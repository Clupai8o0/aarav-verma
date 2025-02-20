import clsx from "clsx";
import React from "react";

interface Props {
	className?: string;
	parentClassname?: string;
	id?: string;
	outerChildren?: React.ReactNode;
	children: React.ReactNode;
}

function Bounded({
	className,
	parentClassname,
	id,
	outerChildren,
	children,
}: Props) {
	return (
		<section
			className={clsx(
				"relative w-full flex justify-center overflow-hidden",
				parentClassname
			)}
			id={id}
		>
			{outerChildren}
			<div
				className={clsx("flex flex-col relative max-w-7xl w-full", className)}
			>
				{children}
			</div>
		</section>
	);
}

export default Bounded;
