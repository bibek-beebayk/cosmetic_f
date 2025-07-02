export interface User {
    id: string;
    email: string;
    username?: string;
}

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface SiteSettings {
    colorMode : string
}