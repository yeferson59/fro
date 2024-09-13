'use server'

import { z } from 'zod'
import { SignInType, SignUpType } from '../definitions/types'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

const signInSchema = z.object({
    email: z.string().email("Por favor, introduce un correo electrónico válido."),
    password: z.string().min(1, "La contraseña es requerida.")
})

export async function signInAction(prevState: SignInType, formData: FormData) {

    const { success, data, error } = signInSchema.safeParse(Object.fromEntries(formData))

    if (!success) {
        return { errors: error.flatten().fieldErrors }
    }

    try {
        await signIn('credentials', data)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { success: false, message: 'Error' }
                default:
                    return { success: false, message: 'Ocurrió un error' }
            }
        }
        throw error
    }
}

const signUpSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres."),
    username: z.string().min(4, "El nombre de usuario debe tener al menos 4 caracteres."),
    email: z.string().email("Por favor, introduce un correo electrónico válido."),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres.")
})

export async function signUp(response: SignUpType, formData: FormData) {

    const { success, error, data } = signUpSchema.safeParse(Object.fromEntries(formData))

    if (!success) {
        console.log(error)
        return { errors: error.flatten().fieldErrors }
    }

    console.log(data)

    try {
        const response = await fetch('https://backend-finance-app-fry1.onrender.com/api/auth/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            return { success: false, message: 'error' }
        }
        redirect('auth/sign-in')
    } catch (error) {
        console.error('Error during authentication:', error)
        return { success: false, message: 'error' }
    }
}