"use client";

import { Image } from "./lib/types";
import { generateKey } from "./lib/utils";

import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./components/ui/carousel";
import { useEffect, useState } from "react";

const Gallery = ({ images }: { images: Image[] }) => {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) return;

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<Carousel className="w-2/3 lg:w-1/2" setApi={setApi}>
			<CarouselContent>
				{images.map(({ url, altText }) => (
					<CarouselItem key={generateKey()}>
						<img src={url} alt={altText} className="w-full" />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselNext />
			<CarouselPrevious />

			<div
				className="pt-4 text-center text-base font-sans"
				style={{ opacity: 0.5 }}
			>
				Image {current} of {count}
			</div>
		</Carousel>
	);
};

export default Gallery;
