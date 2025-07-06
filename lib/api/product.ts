import { apiCall } from '../axios'

type WishlistResponse = {
  message: string
}

export const toggleWishlist = async (productId: number) => {
  return apiCall<WishlistResponse>('post', `/wishlist/toggle/`, { product_id: productId })
}

export const addToCart = async (productId: number, quantity = 1, selectedShade: number | null = null, selectedVariant: number | null = null) => {
  return apiCall('post', `/cart/add/`, { product_id: productId, quantity, selected_shade: selectedShade, selected_variant: selectedVariant })
}

export const updateCartQuantity = async (cartItemId: number, quantity: number) => {
  return apiCall('patch', `/cart/${cartItemId}/update-quantity/`, { quantity })
}

export const removeFromCart = async (cartItemId: number) => {
  return apiCall('delete', `/cart/${cartItemId}/`)
}
