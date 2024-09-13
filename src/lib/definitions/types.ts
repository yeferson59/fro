export type SignUpType = {
    errors?: {
        name?: string[],
        lastName?: string[],
        username?: string[],
        email?: string[],
        password?: string[]
    }
    message?: string,
    success?: boolean
} | undefined

export type SignInType = {
    errors?: {
        email?: string[],
        password?: string[],
    }
    message?: string,
    success?: boolean
} | undefined