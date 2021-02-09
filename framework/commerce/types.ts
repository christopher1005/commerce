export interface Discount {
  // The value of the discount, can be an amount or percentage
  value: number
}

export interface LineItem {
  id: string
  variantId: string
  productId: string
  name: string
  quantity: number
  discounts: Discount[]
  // A human-friendly unique string automatically generated from the product’s name
  path: string
  variant: ProductVariant
}

export interface Measurement {
  value: number
  unit: 'KILOGRAMS' | 'GRAMS' | 'POUNDS' | 'OUNCES'
}

export interface Image {
  url: string
  altText?: string
  width?: number
  height?: number
}

export interface ProductVariant {
  id: string
  // The SKU (stock keeping unit) associated with the product variant.
  sku: string
  // The product variant’s title, or the product's name.
  name: string
  // Whether a customer needs to provide a shipping address when placing
  // an order for the product variant.
  requiresShipping: boolean
  // The product variant’s price after all discounts are applied.
  price: number
  // Product variant’s price, as quoted by the manufacturer/distributor.
  listPrice: number
  // Image associated with the product variant. Falls back to the product image
  // if no image is available.
  image?: Image
  // Indicates whether this product variant is in stock.
  isInStock?: boolean
  // Indicates if the product variant is available for sale.
  availableForSale?: boolean
  // The variant's weight. If a weight was not explicitly specified on the
  // variant this will be the product's weight.
  weight?: Measurement
  // The variant's height. If a height was not explicitly specified on the
  // variant, this will be the product's height.
  height?: Measurement
  // The variant's width. If a width was not explicitly specified on the
  // variant, this will be the product's width.
  width?: Measurement
  // The variant's depth. If a depth was not explicitly specified on the
  // variant, this will be the product's depth.
  depth?: Measurement
}

// Shopping cart, a.k.a Checkout
export interface Cart {
  id: string
  // ID of the customer to which the cart belongs.
  customerId?: string
  // The email assigned to this cart
  email?: string
  // The date and time when the cart was created.
  createdAt: string
  // The currency used for this cart
  currency: { code: string }
  // Specifies if taxes are included in the line items.
  taxesIncluded: boolean
  lineItems: LineItem[]
  // The sum of all the prices of all the items in the cart.
  // Duties, taxes, shipping and discounts excluded.
  lineItemsSubtotalPrice: number
  // Price of the cart before duties, shipping and taxes.
  subtotalPrice: number
  // The sum of all the prices of all the items in the cart.
  // Duties, taxes and discounts included.
  totalPrice: number
  // Discounts that have been applied on the cart.
  discounts?: Discount[]
}

/**
 * Cart mutations
 */

// Base cart item body used for cart mutations
export interface CartItemBody {
  variantId: string
  productId?: string
  quantity?: number
}

// Body used by the `getCart` operation handler
export interface GetCartHandlerBody {
  cartId?: string
}

// Body used by the add item to cart operation
export interface AddCartItemBody<T extends CartItemBody> {
  item: T
}

// Body expected by the add item to cart operation handler
export interface AddCartItemHandlerBody<T extends CartItemBody>
  extends Partial<AddCartItemBody<T>> {
  cartId?: string
}

// Body used by the update cart item operation
export interface UpdateCartItemBody<T extends CartItemBody> {
  itemId: string
  item: T
}

// Body expected by the update cart item operation handler
export interface UpdateCartItemHandlerBody<T extends CartItemBody>
  extends Partial<UpdateCartItemBody<T>> {
  cartId?: string
}

// Body used by the remove cart item operation
export interface RemoveCartItemBody {
  itemId: string
}

// Body expected by the remove cart item operation handler
export interface RemoveCartItemHandlerBody extends Partial<RemoveCartItemBody> {
  cartId?: string
}