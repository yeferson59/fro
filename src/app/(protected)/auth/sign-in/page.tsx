'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, LockIcon, MailIcon } from 'lucide-react'
import { signIn } from '@/lib/actions/auth'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SignIn() {
    const [error, setError] = useState('')
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        const result = await signIn(formData)
        if (result.error) {
            setError(result.error)
        } else {
            router.push('/dashboard')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
                    <CardDescription className="text-center">
                        Ingresa a tu cuenta de inversiones
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form action={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <div className="relative">
                                <MailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="nombre@ejemplo.com"
                                    required
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        {error && (
                            <div className="flex items-center space-x-2 text-red-600 mt-2">
                                <AlertCircle size={20} />
                                <span>{error}</span>
                            </div>
                        )}
                        <Button type="submit" className="w-full mt-4 bg-green-600 hover:bg-green-700">
                            Iniciar Sesión
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-center text-sm text-gray-600 mt-2">
                        ¿No tienes una cuenta?{' '}
                        <a href="/signup" className="text-green-600 hover:underline">
                            Regístrate
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}