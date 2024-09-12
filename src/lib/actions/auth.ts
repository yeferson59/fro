'use server'

import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')

    // Aquí deberías implementar la lógica real de autenticación
    // Por ahora, simularemos una autenticación básica
    if (email === 'usuario@ejemplo.com' && password === 'contraseña123') {
        redirect('/dashboard')
    }

    return { error: 'Credenciales inválidas' }
}

export async function signUp(formData: FormData) {
    const name = formData.get('name')
    const lastName = formData.get('lastName')
    const user = formData.get('user')
    const email = formData.get('email')
    const password = formData.get('password')

    // Aquí deberías implementar la lógica real de registro
    // Por ahora, simularemos un registro básico con validaciones
    if (name && lastName && user && email && password) {
        // Validación básica
        if (typeof user === 'string' && user.length < 4) {
            return { error: 'El nombre de usuario debe tener al menos 4 caracteres.' }
        }
        if (typeof password === 'string' && password.length < 8) {
            return { error: 'La contraseña debe tener al menos 8 caracteres.' }
        }

        // En una aplicación real, aquí verificarías si el usuario ya existe,
        // guardarías los datos en la base de datos, enviarías un email de confirmación, etc.

        console.log('Usuario registrado:', { name, lastName, user, email })
        redirect('/dashboard')
    }

    return { error: 'Todos los campos son requeridos. Por favor, intenta de nuevo.' }
}