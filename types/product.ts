import { User } from "./auth";

type Category = {
    name: string;
    slug: string;
    image: string;
    description: string;
    parent: string | null;
}

type Brand = {
    name: string;
    slug: string;
    logo: string;
}

type Image = {
    image: string;
    is_main: boolean;
}

type Property = {
    key: string;
    value: string;
}

type Shade = {
    id: number;
    name: string;
    hex_code: string;
    image: string;
    sku: string;
    stock: number;
}

type Variant = {
    id: number;
    name: string;
    price: number;
    stock: number;
    image: string;
    sku: string;
}

type Review = {
    id: number;
    comment: string;
    created_at: string;
    rating: number;
    user: User;
}

export type ProductData = {
    id:  number;
    name: string;
    slug: string;
    description: string;
    category: Category;
    brand: Brand;
    ingredients: string | null;
    how_to_use: string | null;
    price: number;
    images: Image[] | [];
    rating: number;
    properties: Property[] | [];
    shades: Shade[] | [];
    variants: Variant[] | [];
    is_in_wishlist: boolean;
    reviews: Review[] | [];
    has_user_reviewed: boolean;
}