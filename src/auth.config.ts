import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

// Notice this is only an object, not a full Auth.js instance

const signInSchema = z.object({
    email: z.string().email("Por favor, introduce un correo electrónico válido."),
    password: z.string().min(1, "La contraseña es requerida.")
})
export default {
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const { success, data } = signInSchema.safeParse(credentials)

                if (success) {
                    try {
                        const response = await fetch('https://backend-finance-app-fry1.onrender.com/api/auth/sign-in', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data),
                        })

                        if (!response.ok) {
                            throw new Error('Error')
                        }

                        const user = await response.json()

                        // Asegúrate de que el objeto user tenga la estructura correcta
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            image: user.image
                        }
                    } catch (error) {
                        console.error('Error during authentication:', error)
                        return null
                    }
                }

                console.error('Invalid credentials')
                return null
            },
        }),
    ],
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                // Puedes agregar más campos al token si es necesario
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                // Puedes agregar más campos a la sesión si es necesario
            }
            return session
        },
    },
} satisfies NextAuthConfig