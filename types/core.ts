export type Banner = {
  title: string
  image: string
  link: string | null
}

export type ProductList = {
  id: number
  name: string
  slug: string
  image: string
  price: number
  rating: number
  brand: string
  is_in_wishlist: boolean
}

export type BrandData = {
  id: number
  name: string
  slug: string
  logo: string
}

export type CategoryData = {
  name: string
  slug: string
  image: string
  description: string
  parent: string | null
}

export type PaginationType = {
  count: number
  next: string | null
  page: number
  pages: number
  previous: string | null
  size: number
}

export type BasicResponse = {
  message: string
}