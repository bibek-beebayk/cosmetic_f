export type Banner = {
  title: string
  image: string
  link: string | null
}

export type ProductList = {
  name: string
  slug: string
  image: string
  price: number
  rating: number
  brand: string
}

export type BrandData = {
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