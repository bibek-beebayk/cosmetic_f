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
    name: string;
    hex_code: string;
    image: string;
}

type Variant = {
    name: string;
    price: number;
    stock: number;
    image: string;
    sku: string;
}

export type ProductData = {
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
}