const imageFragment = /* GraphQL */ `
	fragment image on Image {
		url
		altText
		width
		height
	}
`;

const seoFragment = /* GraphQL */ `
	fragment seo on SEO {
		description
		title
	}
`;

export const productFragment = /* GraphQl */ `
    fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
    }
    ${imageFragment}
    ${seoFragment}
`;

export const cartFragment = /* GraphQL */ `
	fragment cart on Cart {
		id
		checkoutUrl
		cost {
			subtotalAmount {
				amount
				currencyCode
			}
			totalAmount {
				amount
				currencyCode
			}
			totalTaxAmount {
				amount
				currencyCode
			}
		}
		lines(first: 100) {
			edges {
				node {
					id
					quantity
					cost {
						totalAmount {
							amount
							currencyCode
						}
					}
					merchandise {
						... on ProductVariant {
							id
							title
							selectedOptions {
								name
								value
							}
							product {
								...product
							}
						}
					}
				}
			}
		}
		totalQuantity
	}
	${productFragment}
`;
