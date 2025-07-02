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