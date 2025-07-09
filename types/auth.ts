export interface User {
    email: string;
    id?: string;
}

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SiteSettings {
    colorMode : string
}

export interface UserDetail {
    id: string
    email: string
    full_name: string | null
    phone: string | null
    address: string | null
}