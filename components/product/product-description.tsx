import { Product } from "@/lib/shopify/types";
import Price from "../price";
import VariantSelector from "./variant-selector";
import Prose from "../prose";
import { AddToCart } from "../cart/add-to-cart";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-2 text-5xl font-serif">{product.title}</h1>
        <div className="text-white mt-2 text-lg">
        {/* <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white"> */}
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>

      {/* <VariantSelector options={product.options} variants={product.variants} /> */}

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-light text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}

      <AddToCart product={product} />
    </>
  );
}
