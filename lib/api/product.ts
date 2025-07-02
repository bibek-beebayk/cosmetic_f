import { apiCall } from '../axios'

export const toggleWishlist = async (productId: number) => {
  return apiCall('post', `/wishlist/toggle/`, { product_id: productId })
}

export const addToCart = async (productId: number, quantity = 1) => {
  return apiCall('post', `/cart/add/`, { product_id: productId, quantity })
}