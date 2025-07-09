import { ProductList } from "./core"
import { Shade, Variant } from "./product"

export type OrderItem = {
    id: number,
    product: number,
    variant: number,
    shade: number,
    quantity: number,
    price: number,
    product_data: ProductList,
    variant_data: Variant | null,
    shade_data: Shade | null
}


export type Order = {
    id: number,
    created_at: string,
    total_price: number,
    shipping_address: string | null,
    is_paid: boolean,
    status: string,
    items: OrderItem[],
    payment_method: string
}